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
          <h2>${city}天气</h2>
          <p>🌡温度：<span class="temperature">--</span>°${unit}</p>
          <p>🌈状态：<span class="condition">加载中...</span></p>
        </div>
      `;
    }
  
    connectedCallback() {
      const city = this.getAttribute("city") || "未知城市";
      const unit = this.getAttribute("unit") || "C";
      this.loadData(city,unit);
    }
  
    async loadData() {
        var UID = "U785B76FC9"; // 测试用 用户ID，请更换成您自己的用户ID
        var KEY = "4r9bergjetiv1tsd"; // 测试用key，请更换成您自己的 Key
        var API = "http://api.seniverse.com/v3/weather/now.json"; // 获取天气实况
        var LOCATION = "beijing"; // 除拼音外，还可以使用 v3 id、汉语等形式

        // 获取当前时间戳
        var ts = Math.floor((new Date()).getTime() / 1000);
        // 构造验证参数字符串
        var str = "ts=" + ts + "&uid=" + UID;

        // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串（raw）进行加密
        // 并将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
        var sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64);
        sig = encodeURIComponent(sig);
        str = str + "&sig=" + sig;

        // 构造最终请求的 url
        var url = API + "?location=" + LOCATION + "&" + str + "&callback=foo";

        console.log(url)

        // 直接发送请求进行调用，手动处理回调函数
        $.getJSON(url, function(data) {
            var obj = document.getElementById('content');
            var weather = data.results[0];

            var text = [];
            text.push("Location: " + weather.location.path);
            text.push("Weather: " + weather.now.text);
            text.push("Temperature: " + weather.now.temperature);

            obj.innerText = text.join("\n")
        });

    }
  }
  