# 11ty-vite-shopify
11tyとviteをつかったShopify開発環境。

## 概要
この開発環境では、Shopifyのテーマをカスタマイズ、もしくはスクラッチで構築できます。
- 静的サイトのコーディング
- Shopifyテーマのカスタマイズ、構築

## 必要な環境
- Node v16+(https://nodejs.org/ja/)
- Shopify CLI v2.20.0+(https://shopify.dev/themes/tools/cli/installation)

## 使い方
このリポジトリをクローンして、必要なパッケージをインストールしてください。
```
npm install
```

### 11tyで静的サイト
下記コマンドを入力してください。
```
npm run dev
```


### Shopifyの認証
Shopifyのテーマをカスタマイズする前に、ストアにログインする必要があります。

下記コマンドを入力
```
shopify login --store ストア名.myshopify.com
```

### 新しいテーマを作成
下記コマンドを入力して、新しいテーマを作成できます。
Dawnが `Shopify` フォルダにコピーされます。
```
npm run newtheme
```

### Shopifyテーマを開発、カスタマイズする場合
ストアにログインし、下記コマンドを入力してください。
```
npm run shopify
```

### ストアにテーマをプッシュ
ストアにプッシュするには、下記のコマンドを入力してください。
```
npm run deploy
```
コマンド実行後、どのテーマに上書きするか選択し、`Enter` キーを押下します。

### お役立ち
お役立ちサイトを立ち上げるには下記コマンドを実行してください。
```
npm run opendoc
```
下記、３サイトが立ち上がります。
📖 Liquid reference(https://shopify.dev/api/liquid)
📖 Shopify Cheat Sheet(https://www.shopify.com/partners/shopify-cheat-sheet)
📖 Shopify Liquid Code examples(https://shopify.github.io/liquid-code-examples/)
