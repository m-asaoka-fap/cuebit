/*
 * cue:bit for micro:bit customblocks
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
    let command_enable = 1 // コマンド受付フラグ
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
        basic.showIcon(IconNames.Heart);
    }
    /**
    * 送信間隔の設定を行う、「ずっと」で使う、100~10000の間で設定する、単位はミリ秒
    * ※コマンド送信間隔を調整することで、microbit側のコマンドがスタックしないように対応する
    * ※必ず「ずっと」ブロックにいれること
    * @param 送信間隔の設定を行う value 100-10000, eg: 1000
    */
    //% block="送信間隔を設定する(ミリ秒) %value"
    //% group="設定（せってい）"
    export function setorder(value: number): void {
        if (command_enable == 0) {
            basic.pause(value)
            // コマンド受付フラグをON
            command_enable = 1
        }
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
     * ジグザグ走行(15cmほど)
     */
    //% block="線（せん）に沿って（そって）ジグザクに進む（すすむ）"
    //% group="基本（きほん）"
    export function ziguzagu_15():void {
        // 15センチほどジグザク走行する
        ziguzagu(15);
    }
    /**
     * スケート走行(15cmほど)
    */
    //% block="線（せん）に沿って（そって）スケート走行（そうこう）する"
    //% group="基本（きほん）"
    export function skate_15() : void  {
        // 15センチほどスケート走行する
        skate(15);
    }
    /**
    * 指定したXX㎝前進する
    */
    //% block="前（まえ）に%value cm(センチ)進む（すすむ）"
    //% group="応用（おうよう）"
    export function forward(value : number) : void {
        let strText = "F" + value;
        showLedText(strText);
        basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
        sendText(strText);
    }
    /**
    * 指定したXX㎝後ろに進む
    */
    //% block="後ろ（うしろ）に%value cm(センチ)進む（すすむ）"
    //% group="応用（おうよう）"
    export function back(value: number): void {
        let strText = "F" + "-" + value; 
        showLedText(strText);
        basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
        sendText(strText);
    }
    /**
    * 指定した角度に右回転する
    */
    //% block="右（みぎ）に%value 度（ど）回転（かいてん）する"
    //% group="応用（おうよう）"
    export function rightRotate(value : number) : void {
        let strValue = "R" + value;
        showLedText(strValue);
        basic.showLeds(`
                # # # # .
                . . . # .
                . # . # .
                . . # # #
                . . . # .
        `)
        sendText(strValue);
    }
    /**
    * 指定した角度に左回転する
    */
    //% block="左（ひだり）に%value 度（ど）回転（かいてん）する"
    //% group="応用（おうよう）"
    export function leftRotate(value: number): void {
        let strValue = "L" + value;
        showLedText(strValue);
        basic.showLeds(`
                . # # # #
                . # . . .
                . # . # .
                # # # . .
                . # . . .
        `)
        sendText(strValue);
    }
    /**
    * 指定したXXcmジグザグ走行（そうこう）する
    */
    //% block="%value cm（センチ）線（せん）にそって ジグザグ走行（そうこう）する"
    //% group="応用（おうよう）"
    export function ziguzagu(value: number) : void {
        let strValue = "Z" + value;
        showLedText(strValue);
        basic.showIcon(IconNames.Yes);
        sendText(strValue);
    }
    /**
    * 指定したXXcmスケート走行（そうこう）する
    */
    //% block="%value cm（センチ）線（せん）にそって スケート走行（そうこう）する"
    //% group="応用（おうよう）"
    export function skate(value: number) : void  {
        let strValue = "S" + value;
        showLedText(strValue);
        basic.showIcon(IconNames.Diamond);
        sendText(strValue);
    }
    /**
    * シリアル通信で文字列を送信します
    */
    export function sendText(value: string): void {
        // 初期化ができていないときは処理をしない
        if (b_Init == true && command_enable == 1) {
            // シリアル通信にて、文字列を送信する
            serial.writeLine(value);
            // コマンドを送信したので送信中ロックを解除
            command_enable = 0;
        }
    }
    /**
    *  文字列をLEDで表示します
    */
    export function showLedText(value: string): void {
        basic.showString(value);
    }
}
