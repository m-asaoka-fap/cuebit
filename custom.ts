/*
 * StackChan:bit for micro:bit customblocks
 *
 * Copyright © 2024-2025 FAP. All rights reserved.
 *
 * 2024.12.29  (FAP)m-asaoka  新規作成
 *
 */

/**
 *  カスタムブロック
 */
//% weight=0 color=#F22E1F icon="\uf076" block="キュー：ビット"
// 回転の向き
enum CustomRotateDir {
    // 右向きに回転する
    Right = 0,
    // 左向きに回転する
    Left = 1
}
namespace cuebit {
    let b_Init = false; // 初期化済みフラグ
    /**
    * キュービットを使うための設定を行います
    */
    //% block="キュー:ビットをはじめる"
    //% group="設定（せってい）"
    export function start(): void {
        // シリアル通信をセットアップする
        serial.redirect(
            SerialPin.P0,
            SerialPin.P1,
            BaudRate.BaudRate115200
        )
        // セットアップが終わるまでWait
        basic.pause(1000);
        // 今からmicrobitプログラミングを開始するよ、コマンドを送信
        sendText("$");
        basic.pause(1000);
        // 初期化完了
        b_Init = true;
    }
    /**
    * みぎに回転（かいてん）する
    */
    //% block="↷ みぎに回転（かいてん）する"
    //% group="基本（きほん）"
    export function rightRotate_90() : void {
        // 右に90度回転する
        rightRotate(90);
    }
    /**
    * 指定した角度回転する
    */
    //% block="右（みぎ）に%value 度（ど）回転（かいてん）する"
    //% group="応用（おうよう）"
    export function rightRotate(value : number) : void {
        basic.showLeds(`
                # # # # .
                . . . # .
                . # . # .
                . . # # #
                . . . # .
        `)
        let strValue = "R" + value;
        sendText(strValue);
    }
    /**
    * シリアル通信で文字列を送信します
    */
    export function sendText(value: string): void {
        // 初期化ができていないときは処理をしない
        if (b_Init != true) {
            return;
        }
        // シリアル通信にて、文字列を送信する
        serial.writeLine(value);
    }
}
