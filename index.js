const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
  }

  calculateHash() {
    return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString()
  }

}

class Blockchain {
    constructor() {
      this.chain = [ this.createGenesisBlock() ]
    }

    createGenesisBlock() {
      let genesisBlock = new Block(0, "01/09/2019", "Genesis Block", "0")
      genesisBlock.hash = genesisBlock.calculateHash()
      return genesisBlock
    }

    getLatestBlock() {
      return this.chain[this.chain.length - 1]
    }

    addBlock( newBlock ) {
      newBlock.previousHash = this.getLatestBlock().hash
      newBlock.hash = newBlock.calculateHash()
      this.chain.push(newBlock)
    }

}

let demoChain = new Blockchain()

demoChain.addBlock( new Block(1, "02/09/2019", {amount: 10} ) )
demoChain.addBlock( new Block(2, "03/09/2019", {amount: 25} ) )

console.log(JSON.stringify(demoChain, null, 4))