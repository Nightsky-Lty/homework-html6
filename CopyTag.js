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
                }
                .container {
                    position: relative;
                }
            </style>
            <div class="container">
                <p class="content"></p>
            </div>
            `;
        this.containerDiv = this.shadowRoot.querySelector('.container');
        this.contentP = this.shadowRoot.querySelector('.content');
    }

    _observer = new MutationObserver(() => this.updateContent());

    async copyTextToClipboard() 
    {
        try 
        {
            const text = this.textContent;
            await navigator.clipboard.writeText(text);
            console.log("复制成功！");
        } 
        catch (err) 
        {
            console.error("复制失败:", err);
        }
      }

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

    attributeChangedCallback()
    {
        this.updateAttribute();
    }

    updateAttribute()
    {
        this.contentP.style.color = this.getAttribute('color') || "#2c3e50";
    }

    updateContent()
    {
        this.contentP.textContent = this.textContent;
    }


    addPEventListener()
    {
        this.contentP.addEventListener('click',this.copyTextToClipboard);
    }
}

customElements.define("copy-tag",CopyTag);