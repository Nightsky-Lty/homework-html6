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

1. **自定义标签**:
   - `marker-button`: 允许用户在画布上进行标记。
   - `shape-text`: 显示不同形状的文本。
   - `weather-card`: 显示天气信息。
   - `copy-tag`: 提供点击复制功能。
   - `progress-bar`: 显示进度条。
   - `flip-card`: 实现卡片翻转效果。
   - `model-viewer`: 使用 Three.js 渲染 3D 模型。

2. **3D 渲染**:
   - 使用 Three.js 创建和管理 3D 场景。
   - 支持不同几何体的渲染（如立方体、圆柱体、锥体等）。
   - 实现基本的光照效果。

3. **交互功能**:
   - 鼠标事件监听，实现 3D 模型的旋转。
   - 自定义元素的属性变化监听，实现动态更新。

## 项目结构

- **HTML 文件**: 定义页面结构和自定义元素的使用。
- **JavaScript 文件**: 实现自定义元素的逻辑和 Three.js 场景的初始化。
- **CSS 样式**: 定义自定义元素的样式。

## 遇到的问题和解决方案

- **Three.js 初始化问题**: 确保在元素插入 DOM 后再进行初始化，以正确计算元素尺寸。
- **未定义错误**: 在操作对象前检查其是否已定义，避免运行时错误。
- **相机设置**: 调整相机位置和视角以获得最佳的 3D 显示效果。

## 未来改进

- **增强交互性**: 增加更多的用户交互功能，如缩放和拖拽。
- **优化性能**: 通过减少不必要的渲染和优化代码逻辑来提高性能。
- **扩展功能**: 增加更多的自定义元素和 3D 模型支持。

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
