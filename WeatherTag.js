class WeatherCard extends HTMLElement {
    constructor() {
        super();
        // 创建 Shadow DOM
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
            .weather-card {
                font-family: Arial, sans-serif;
                background: #f0f9ff;
                border-radius: 10px;
                padding: 20px;
                width: 250px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            h2 { color: #2c3e50; }
            p { color: #34495e; }
            </style>
            <div class="weather-card">
                <h2 class="city">--天气</h2>
                <p>🌡温度：<span class="temperature">--</span>°</p>
                <p>🌈状态：<span class="condition">加载中...</span></p>
            </div>
        `;
    }

    connectedCallback() {
        this.loadData();
    }

    async loadData() {
        var KEY = "SjFE-iSnArlJF6fVn";
        var API = "http://api.seniverse.com/v3/weather/now.json";
        var LOCATION = this.getAttribute('city') || "jinan";

        var url = API + "?key=" + KEY + "&location=" + LOCATION + "&language=zh-Hans&unit=c";

        console.log(url);

        const self = this;
        $.getJSON(url, function(data) {
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