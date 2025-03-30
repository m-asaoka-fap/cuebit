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
    * ブレーキ（一時停止）
    */
    //% block="■ ■ 一旦停止（いったんていし）"
    //% group="基本（きほん）"
    export function brake() :void {
        basic.showLeds(`
        # # . # #
        # # . # #
        # # . # #
        # # . # #
        # # . # #
        `)
        let strText = "B";
        sendText(strText);
    }
    /**
    * まっすぐ進む（10㎝）
    */
    //% block="↑ まっすぐ進む（すすむ）"
    //% group="基本（きほん）"
    export function forward_10(): void {
        forward(10);
    }
    /**
    * うしろに進む（－10cm)
    */
    //% block="↓ うしろに進む（すすむ）"
    //% group="基本（きほん）"
    export function back_10(): void {
        back(10);
    }
    /**
    * みぎに回転（かいてん）する
    */
    //% block="↷ 右（みぎ）に回転（かいてん）する"
    //% group="基本（きほん）"
    export function rightRotate_90() : void {
        // 右に90度回転する
        rightRotate(90);
    }
    /**
    * ひだりに回転（かいてん）する
    */
    //% block="↶　左（ひだり）に回転（かいてん）する"
    //% group="基本（きほん）"
    export function leftRotate_90(): void {
        // 左に90度回転する
        leftRotate(90);
    }
    /**
    * 指定したXX㎝前進する
    */
    //% block="前（まえ）に%value cm(センチ)進む（すすむ）"
    //% group="応用（おうよう）"
    export function forward(value : number) : void {
        basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
        let strText = "F" + value;
        sendText(strText);
    }
    /**
    * 指定したXX㎝後ろに進む
    */
    //% block="後ろ（うしろ）に%value cm(センチ)進む（すすむ）"
    //% group="応用（おうよう）"
    export function back(value: number): void {
        basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
        let iValue = 0 - value; // マイナス値に指定
        let strText = "F" + iValue;
        sendText(strText);
    }
    /**
    * 指定した角度に右回転する
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
    * 指定した角度に左回転する
    */
    //% block="左（ひだり）に%value 度（ど）回転（かいてん）する"
    //% group="応用（おうよう）"
    export function leftRotate(value: number): void {
        basic.showLeds(`
                . # # # #
                . # . . .
                . # . # .
                # # # . .
                . # . . .
        `)
        let strValue = "L" + value;
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
    export function showLedText(value: string): void {
        
    }
}
