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
