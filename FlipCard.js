class FlipCard extends HTMLElement 
{
    static get observedAttributes() 
    {
        return ['front-color', 'back-color', 'font-size', 'width', 'height'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    perspective: 1000px;
                }
                .flip-card {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transform-style: preserve-3d;
                    transition: transform 0.6s;
                }
                .flip-card-inner {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                }
                .flip-card-front, .flip-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: var(--font-size, 24px);
                    color: white;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                    border-radius: 10px;
                }
                .flip-card-front {
                    background-color: var(--front-color, #2980b9);
                }
                .flip-card-back {
                    background-color: var(--back-color, #e74c3c);
                    transform: rotateY(180deg);
                }
                :host([flipped]) .flip-card {
                    transform: rotateY(180deg);
                }
            </style>
            <div class="flip-card">
                <div class="flip-card-inner flip-card-front">
                    <slot name="front">Front</slot>
                </div>
                <div class="flip-card-inner flip-card-back">
                    <slot name="back">Back</slot>
                </div>
            </div>
        `;
    }

    connectedCallback() 
    {
        this.addEventListener('click', this.toggleFlip);
        this.updateStyles();
    }

    disconnectedCallback() 
    {
        this.removeEventListener('click', this.toggleFlip);
    }

    attributeChangedCallback(name, oldValue, newValue) 
    {
        if (oldValue !== newValue) 
        {
            this.updateStyles();
        }
    }

    updateStyles() 
    {
        const frontColor = this.getAttribute('front-color') || '#2980b9';
        const backColor = this.getAttribute('back-color') || '#e74c3c';
        const fontSize = this.getAttribute('font-size') || '24px';
        const width = this.getAttribute('width') ? `${this.getAttribute('width')}px` : '200px';
        const height = this.getAttribute('height') ? `${this.getAttribute('height')}px` : '300px';

        this.style.setProperty('--front-color', frontColor);
        this.style.setProperty('--back-color', backColor);
        this.style.setProperty('--font-size', fontSize);
        this.style.width = width;
        this.style.height = height;
    }

    toggleFlip() 
    {
        this.toggleAttribute('flipped');
    }
}

customElements.define('flip-card', FlipCard);
