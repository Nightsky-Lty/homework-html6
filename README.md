# 项目报告: homework-html6

## 项目概述

- **项目名称**: homework-html6
- **项目目标**: 设计和实现一些自定义 HTML 标签，利用 Three.js 进行 3D 渲染，并通过 JavaScript 实现交互功能。

## 技术栈

- **HTML5**: 用于定义页面结构和自定义元素。
- **CSS3**: 用于样式化自定义元素。
- **JavaScript**: 用于实现自定义元素的逻辑和交互。
- **Three.js**: 用于 3D 渲染和场景管理。
- **jQuery**: 用于简化 DOM 操作和 AJAX 请求。

## 主要功能

**自定义标签**:
   - `marker-button`: 允许用户在画布上进行标记。
   - `shape-text`: 显示不同形状的文本。
   - `weather-card`: 显示天气信息。
   - `copy-tag`: 提供点击复制功能。
   - `progress-bar`: 显示进度条。
   - `flip-card`: 实现卡片翻转效果。
   - `model-viewer`: 使用 Three.js 渲染 3D 模型。
## 标签属性说明

**marker-button**：
- `color`：画笔颜色
- `width`：画布宽度
- `height`：画布高度
- `linewidth`：画笔粗细

**shape-text**：
- `size`：形状大小
- `type`：形状类型
- `color`：形状颜色

**weather-card**：
- `city`：所在城市
- `width`：卡片宽度
- `height`：卡片高度
- `ccolor`：天气字体颜色
- `hcolor`：城市字体颜色
- `tcolor`：温度字体颜色

**copy-tag**：
- `color`：字体颜色

**progress-bar**：
- `color`：进度条颜色

**flip-card**：
- `front-color`：前面颜色
- `back-color`：后面颜色
- `font-size`：字体大小
  
**model-viewer**：
- `width`：模型视图宽度
- `height`：模型视图高度
- `shape`：模型形状（可选值：cube, cylinder, cone）
- `color`：模型颜色（十六进制）
