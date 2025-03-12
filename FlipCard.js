class FlipCard extends HTMLElement {
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
                    font-size: 24px;
                    color: white;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                    border-radius: 10px;
                }
                .flip-card-front {
                    background-color: #2980b9;
                }
                .flip-card-back {
                    background-color: #e74c3c;
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

    connectedCallback() {
        this.addEventListener('click', this.toggleFlip);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.toggleFlip);
    }

    toggleFlip() {
        this.toggleAttribute('flipped');
    }
}

customElements.define('flip-card', FlipCard);
