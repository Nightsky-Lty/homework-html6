class WeatherCard extends HTMLElement 
{
    static get observedAttributes() {return ['width', 'height', 'hcolor', 'tcolor', 'ccolor']}
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
            .container {
                display: flex;
                flex-direction: column;
                align-items: center; /* 垂直居中 */

                font-family: Arial, sans-serif;
                background: #f0f9ff;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            </style>
            <div class="container">
                <h2 class="city">--天气</h2>
                <p>🌡温度：<span class="temperature">--</span>°</p>
                <p>🌈状态：<span class="condition">加载中...</span></p>
            </div>
        `;
        this.containerDiv = this.shadowRoot.querySelector('.container');
        this.cityH = this.shadowRoot.querySelector('.city');
        this.conditionP = this.shadowRoot.querySelector('.condition');
        this.temperatureP = this.shadowRoot.querySelector('.temperature');
    }

    connectedCallback() 
    {
        this.updateAttribute();
        this.loadData();
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if (oldValue !== newValue) {
            this.updateAttribute();
        }
    }

    updateAttribute()
    {                
        const width = this.getAttribute('width') || "300";
        const height = this.getAttribute('height') || "200";
        const hcolor = this.getAttribute('hcolor') || "#2c3e50";
        const temperatureColor = this.getAttribute('tcolor') || "#34495e";
        const conditionColor = this.getAttribute('ccolor') || "#34495e";


        this.containerDiv.style.width = width + "px";
        this.containerDiv.style.height = height + "px";
        this.cityH.style.color = hcolor;
        this.temperatureP.style.color = temperatureColor;
        this.conditionP.style.color = conditionColor;
    }

    async loadData() {
        var KEY = "SjFE-iSnArlJF6fVn";
        var API = "http://api.seniverse.com/v3/weather/now.json";
        var LOCATION = this.getAttribute('city') || "jinan";

        var url = API + "?key=" + KEY + "&location=" + LOCATION + "&language=zh-Hans&unit=c";

        console.log(url);

        const self = this;
        $.getJSON(url, function(data) 
        {
            var weather = data.results[0];

            const location = self.shadowRoot.querySelector('.city');
            location.textContent = weather.location.path;

            const condition = self.shadowRoot.querySelector('.condition');
            condition.textContent = weather.now.text;

            const temperatur = self.shadowRoot.querySelector('.temperature');
            temperatur.textContent = weather.now.temperature;
        });

    }
}

customElements.define('weather-card',WeatherCard);