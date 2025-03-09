class MarkerButton extends HTMLElement {
    static get observedAttributes() { return ['color', 'height', 'width', 'linewidth']; }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = 
            `
            <style>
            :host {
                display: inline-block;
                position: relative;
            }
            button {
                padding: 10px 20px;
                background: #4CAF50;
                color: white;
                border: none;
                cursor: pointer;
                border-radius: 4px;
            }
            button.active {
                background: #f44336;
            }
            canvas {
                position: fixed;
                top: 0;
                left: 0;
                pointer-events: none;
            }
            </style>
            <button></button>
            `;
        this.isMarking = false;
        this.canvas = null;
        this.ctx = null;
        this.isMouseDown = false;
        this.button = this.shadowRoot.querySelector('button');
    }

    _observer = new MutationObserver(() => this.updateButton());

    attributeChangedcallback() {
        this.updateCanvas();
    }

    connectedCallback() {
        this._observer.observe(this,{
            childList: true,
            subtree: true,
            characterData: true
        })
        this.updateCanvas();
        this.updateButton();
        this.addButtonListener();
    }

    disconnectedCallback() {
        this._observer.disconnect();
    }

    updateButton() {
        this.button.textContent = this.textContent;
    }

    updateCanvas() {
        this.canvas = document.createElement('canvas');

        const width = parseInt(this.getAttribute('width')) || window.innerWidth;
        const height = parseInt(this.getAttribute('height')) || window.innerHeight;
        const colorStyle = this.gacetAttribute('color') || "#66ccff";
        const lineWidth = parseInt(this.getAttribute('linewidth')) || 0.5;

        this.canvas.width = width;
        this.canvas.height = height;

        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineWidth = parseInt(lineWidth);
        this.ctx.strokeStyle = colorStyle;
    }

    addButtonListener() {
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', () => {
            this.isMarking = !this.isMarking;
            button.classList.toggle('active', this.isMarking);
            button.textContent = this.isMarking ? '点击禁用标记' : '点击启用标记';
            this.toggleMarking();
        });
    }

    toggleMarking() {
        if (this.isMarking) {
            document.addEventListener('mousedown', this.startDrawing);
            document.addEventListener('mousemove', this.draw);
            document.addEventListener('mouseup', this.stopDrawing);
        } else {
            document.removeEventListener('mousedown', this.startDrawing);
            document.removeEventListener('mousemove', this.draw);
            document.removeEventListener('mouseup', this.stopDrawing);
            this.clearCanvas();
            document.body.style.cursor = 'default';
        }
    }

    startDrawing = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.isMouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    draw = (e) => {
        if (!this.isMarking || !this.isMouseDown) return;
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        this.ctx.stroke();
    };

    stopDrawing = () => {
        this.isMouseDown = false;
    };

    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

customElements.define('marker-button', MarkerButton);