class ModelViewer extends HTMLElement 
{

    static get observedAttributes() 
    {
        return ['width', 'height', 'shape', 'color'];
    }

    constructor() 
    {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                    background-color: #f0f8ff; 
                }
                canvas {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            </style>
            <canvas></canvas>
        `;
        this.canvas = this.shadowRoot.querySelector('canvas');
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
    }

    connectedCallback() 
    {
        this.updateSize();
        this.initThree();
    }

    attributeChangedCallback(name, oldValue, newValue) 
    {
        if (oldValue !== newValue) 
        {
            if (name === 'width' || name === 'height') 
            {
                this.updateSize();
            } 
            else if (name === 'shape' || name === 'color') 
            {
                this.updateShape();
            }
        }
    }

    updateSize() 
    {
        const width = this.getAttribute('width') || '600';
        const height = this.getAttribute('height') || '400';
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
    }

    updateShape() 
    {
        const shape = this.getAttribute('shape') || 'cube';
        const color = this.getAttribute('color') || '0x87cefa';
        let geometry;
        switch (shape) 
        {
            case 'cylinder':
                geometry = new THREE.CylinderGeometry();
                break;
            case 'cone':
                geometry = new THREE.ConeGeometry();
                break;
            default:
                geometry = new THREE.BoxGeometry();
        }
        this.scene.remove(this.cube);
        this.cube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: parseInt(color) })); // Use the color attribute
        this.scene.add(this.cube);
    }

    initThree()
    {
        const width = this.clientWidth;
        const height = this.clientHeight;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(width, height);

        this.updateShape();

        const light = new THREE.AmbientLight(0x404040);
        this.scene.add(light);

        this.animate();        

        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    animate()
    {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    onMouseDown(e)
    {
        this.isDragging = true;
    }

    onMouseMove(e)
    {
        if (!this.isDragging) return;

        const deltaMove = 
        {
            x: e.offsetX - this.previousMousePosition.x,
            y: e.offsetY - this.previousMousePosition.y
        };

        this.cube.rotation.y += deltaMove.x * 0.01;
        this.cube.rotation.x += deltaMove.y * 0.01;

        this.previousMousePosition = 
        {
            x: e.offsetX,
            y: e.offsetY
        };
    }

    onMouseUp(e)
    {
        this.isDragging = false;
    }
}

customElements.define('model-viewer', ModelViewer);
