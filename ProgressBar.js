class ProgressBar extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .progress {
                    width: 100%;
                    background-color: #f3f3f3;
                    border-radius: 5px;
                    overflow: hidden;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                }
                .progress-bar {
                    height: 20px;
                    width: 0;
                    background-color: var(--color, #4caf50);
                    text-align: center;
                    line-height: 20px;
                    color: white;
                }
            </style>
            <div class="progress">
                <div class="progress-bar"></div>
            </div>
        `;
    }

    connectedCallback()
    {
        window.addEventListener('scroll', this.updateProgress.bind(this));
        this.updateProgress();
    }

    disconnectedCallback()
    {
        window.removeEventListener('scroll', this.updateProgress.bind(this));
    }

    updateProgress()
    {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = (scrollTop / docHeight) * 100;

        const progressBar = this.shadowRoot.querySelector('.progress-bar');
        progressBar.style.width = `${percentage}%`;
        progressBar.textContent = `${Math.round(percentage)}%`;
    }
}

customElements.define('progress-bar', ProgressBar);
