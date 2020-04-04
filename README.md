
## Svelte cryptoicon components

svg icons designed by [atomiclabs](https://github.com/atomiclabs/cryptocurrency-icons)

## Installation
```bash
npm install svelte-cryptoicon
```

## Usage
```javascript
<script>
  import { Btc } from 'svelte-cryptoicon'
</script>
<div>
  <Btc />
</div>
```
You can also include the whole icon pack

```javascript
<script>
  import * as Icons from 'svelte-cryptoicon'
</script>
<div>
  <Icons.Btc />
</div>
```
Or include component from source folder

```javascript
<script>
 import Btc from "svelte-cryptoicon/src/icons/Btc.svelte"
</script>
```
Icons can be configured with props:

```javascript
<Btc color="red" size="64" />
```
