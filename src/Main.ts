//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause()
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume()
        }

        this.runGame().catch(e => {
            console.log(e)
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene()
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI()
            this.stage.addChild(loadingView)
            await RES.loadConfig("resource/default.res.json", "resource/")
            await RES.loadGroup("preload", 0, loadingView)
            this.stage.removeChild(loadingView)
        }
        catch (e) {
            console.error(e)
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
        this.addChild(container)

        let bg: egret.Bitmap = GameUtil.createBitmapByName('bg', 'jpg')
        container.addChild(bg)
        // 因为使用了fixedWide模式，自己根据舞台宽高，重新设置背景图片大小（会被裁剪）
        let ratioW = GameUtil.getStageWidth() / bg.width
        let ratioH = GameUtil.getStageHeight() / bg.height
        let ratio = bg.width / bg.height
        if (ratioW > ratioH) {
            bg.width = GameUtil.getStageWidth()
            bg.height = bg.width / ratio
        } else {
            bg.height = GameUtil.getStageHeight()
            bg.width = bg.height * ratio
        }
        bg.x = (GameUtil.getStageWidth() - bg.width) / 2

        SceneController.instance.setStage(container)
        SceneController.initGame()
    }
}

