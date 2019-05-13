// TypeScript file

// 实现BaseScene类
class BaseScene extends egret.DisplayObjectContainer {
    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }
    protected initView() {

    }
}