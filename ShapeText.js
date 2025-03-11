class ShapeText extends HTMLElement 
{
    static get observedAttributes() { return ['type', 'color', 'size']; }
  
    constructor() 
    {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            position: relative;
          }
          .shape {
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
          }
          .text {
            color: white;
            font-family: Arial;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            z-index: 1;
          }
        </style>
        <div class="shape">
          <span class="text"></span>
        </div>
      `;
      this.shapeDiv = this.shadowRoot.querySelector('.shape');
      this.textSpan = this.shadowRoot.querySelector('.text');
    }
  
    attributeChangedCallback() 
    {
      this.updateShape();
    }
  
    _observer = new MutationObserver(() => this.updateContent());
    
    connectedCallback() 
    {
      this._observer.observe(this, { 
        childList: true,
        subtree: true,
        characterData: true
      });
      this.updateContent();
      this.updateShape();
    }
  
    disconnectedCallback() 
    {
      this._observer.disconnect();
    }
  
    updateContent() 
    {
      this.textSpan.textContent = this.textContent.trim();
    }
  
    updateShape() 
    {
      const type = this.getAttribute('type') || 'rectangle';
      const color = this.getAttribute('color') || '#3498db';
      const size = this.getAttribute('size') || '120';
  
      const widthMap = 
      {
        triangle: size,
        circle: size,
        rectangle: `${parseInt(size) * 1.5}px`
      };
      
      this.shapeDiv.style.cssText = `
        width: ${widthMap[type] || size}px;
        height: ${size}px;
        background: ${color};
        ${this.getShapeStyle(type, size)}
      `;
  
      const fontSize = parseInt(size) * 0.2;
      this.textSpan.style.fontSize = `${fontSize}px`;
    }
  
    getShapeStyle(type, size) 
    {
      const styles = 
      {
        triangle: `clip-path: polygon(50% 0%, 0% 100%, 100% 100%)`,
        circle: `border-radius: 50%`,
        rectangle: `border-radius: 4px`
      };
      return styles[type] || '';
    }
  }
  
  customElements.define('shape-text', ShapeText);