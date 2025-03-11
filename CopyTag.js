class CopyTag extends HTMLElement
{
    static get observedAttributes() {return ['color'];}
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = 
            `
            <style>
                :host {
                    position: relative;
                    display: inline-block;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .container {
                    position: relative;
                    padding: 6px 12px;
                    border-radius: 4px;
                    background: rgba(0,0,0,0.05);
                    transition: all 0.2s ease;
                    border: 1px solid rgba(0,0,0,0.1);
                }

                .container:hover {
                    background: rgba(0,0,0,0.08);
                    transform: translateY(-1px);
                }

                .container:active {
                    transform: scale(0.98);
                }

                .content {
                    margin: 0;
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .content::after {
                    content: "📋";
                    opacity: 0.6;
                    font-size: 0.8em;
                    transition: opacity 0.2s;
                }

                :host(:hover) .content::after {
                    opacity: 1;
                }

                .tooltip {
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #333;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 3px;
                    font-size: 12px;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s;
                    white-space: nowrap;
                }

                .tooltip.show {
                    opacity: 1;
                    visibility: visible;
                    top: -38px;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
            </style>
            <div class="container">
                <p class="content"></p>
                <div class="tooltip">已复制!</div>
            </div>

            `;
        this.containerDiv = this.shadowRoot.querySelector('.container');
        this.contentP = this.shadowRoot.querySelector('.content');
        this.tooltip = this.shadowRoot.querySelector('.tooltip');
    }

    _observer = new MutationObserver(() => this.updateContent());

    connectedCallback()
    {
        this._observer.observe(this,{
            childList: true,
            subtree: true,
            characterData: true
        })
        this.updateContent();
        this.addPEventListener();
    }

    disconnectedCallback()
    {
        this._observer.disconnect();
    }

    updateContent()
    {
        this.contentP.textContent = this.textContent;
    }

    addPEventListener()
    {
        this.addEventListener('click',this.copyTextToClipboard);
    }

    async copyTextToClipboard() 
    {
        try {
            const text = this.contentP.textContent;
            await navigator.clipboard.writeText(text);
            this.showTooltip();
            this.containerDiv.style.animation = 'bounce 0.4s ease';
        } catch (err) {
            this.tooltip.textContent = '复制失败!';
            this.tooltip.style.background = '#e74c3c';
            this.showTooltip();
        }
    }

    showTooltip() 
    {
        this.tooltip.classList.add('show');
        clearTimeout(this.tooltipTimeout);
        this.tooltipTimeout = setTimeout(() => {
            this.tooltip.classList.remove('show');
            this.tooltip.style.background = '';
            this.tooltip.textContent = '已复制!';
        }, 2000);
    }

    attributeChangedCallback() 
    {
        this.updateAttribute();
    }

    updateAttribute() 
    {
        this.contentP.style.color = this.getAttribute('color') || "#2c3e50";
    }
}

customElements.define("copy-tag", CopyTag);