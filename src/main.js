import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import axios from 'axios'
import TruffleContract from 'truffle-contract'


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  created: function () {
    this.initWeb3();
    this.initContract();
  },
  data: {
    web3Provider: null,
    web3: null,
    contracts: {},

  },
  methods: {
    initWeb3: async function () {
      if (window.ethereum) {
        this.web3Provider = window.ethereum;
        try {
          // Request account access
          await window.ethereum.enable();
        } catch (error) {
          // User denied account access...
          console.error("User denied account access");
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        this.web3Provider = window.web3.currentProvider;
      }
      // If no injected web3 instance is detected, fall back to Ganache
      else {
        this.web3Provider = new Web3.providers.HttpProvider(
          "http://localhost:7545"
        );
      }
      this.web3 = new Web3(App.web3Provider);
    },
    initContract: function () {
        // Get the necessary contract artifact file and instantiate it with @truffle/contract
        var ipDatabaseArtifact = {
          "contractName": "idDatabase",
          "abi": [
            {
              "constant": false,
              "inputs": [
                {
                  "internalType": "string",
                  "name": "_fingerprint",
                  "type": "string"
                }
              ],
              "name": "addCopyright",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "internalType": "string",
                  "name": "_fingerprint",
                  "type": "string"
                }
              ],
              "name": "buyCopyright",
              "outputs": [],
              "payable": true,
              "stateMutability": "payable",
              "type": "function"
            }
          ],
          "metadata": "{\"compiler\":{\"version\":\"0.5.16+commit.9c3226ce\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"constant\":false,\"inputs\":[{\"internalType\":\"string\",\"name\":\"_fingerprint\",\"type\":\"string\"}],\"name\":\"addCopyright\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"string\",\"name\":\"_fingerprint\",\"type\":\"string\"}],\"name\":\"buyCopyright\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/mnt/d/Documents/Studia/Blockchain/Projekt/inflation/contracts/idDatabase.sol\":\"idDatabase\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"/mnt/d/Documents/Studia/Blockchain/Projekt/inflation/contracts/idDatabase.sol\":{\"keccak256\":\"0x2d6767ac182c8fffc11ac20515fbe5db0be5ccde6c887b0f3a03349ddbde5b18\",\"urls\":[\"bzz-raw://849d59ee04dc89d4ebffe17def45f29233ab43174c40c79bae8e005f52bb29f4\",\"dweb:/ipfs/QmRqJieNEP8ubTzXYGkktX1jbGLrUnJGGDsjrQCWGQrAGh\"]}},\"version\":1}",
          "bytecode": "0x608060405234801561001057600080fd5b50610dac806100206000396000f3fe6080604052600436106100295760003560e01c806320c4b78c1461002e5780636e298d35146100e9575b600080fd5b6100e76004803603602081101561004457600080fd5b810190808035906020019064010000000081111561006157600080fd5b82018360208201111561007357600080fd5b8035906020019184600183028401116401000000008311171561009557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506101b1565b005b3480156100f557600080fd5b506101af6004803603602081101561010c57600080fd5b810190808035906020019064010000000081111561012957600080fd5b82018360208201111561013b57600080fd5b8035906020019184600183028401116401000000008311171561015d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061070e565b005b60006003826040518082805190602001908083835b602083106101e957805182526020820191506020810190506020830392506101c6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390209050600115158160040160009054906101000a900460ff1615151480156102c05750600115156003836040518082805190602001908083835b602083106102785780518252602082019150602081019050602083039250610255565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060010160149054906101000a900460ff161515145b610332576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f4973206e6f7420666f722073616c65210000000000000000000000000000000081525060200191505060405180910390fd5b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156103f8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f546865206f776e65722063616e206e6f7420626520746865206275796572000081525060200191505060405180910390fd5b8060020154341015610472576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f5468652066756e647320617265206e6f742073756666696369656e740000000081525060200191505060405180910390fd5b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f193505050501580156104dc573d6000803e3d6000fd5b50338160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160048054905011156106775760008160030154905060046001600480549050038154811061054c57fe5b90600052602060002090600502016004828154811061056757fe5b90600052602060002090600502016000820181600001908054600181600116156101000203166002900461059c929190610b08565b506001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001820160149054906101000a900460ff168160010160146101000a81548160ff02191690831515021790555060028201548160020155600382015481600301556004820160009054906101000a900460ff168160040160006101000a81548160ff021916908315150217905550905050505b600480548061068257fe5b6001900381819060005260206000209060050201600080820160006106a79190610b8f565b6001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160146101000a81549060ff0219169055600282016000905560038201600090556004820160006101000a81549060ff0219169055505090555050565b600015156003826040518082805190602001908083835b602083106107485780518252602082019150602081019050602083039250610725565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060040160009054906101000a900460ff161515146107e4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b815260200180610d4d602b913960400191505060405180910390fd5b6107ec610bd7565b6040518060c001604052808381526020013373ffffffffffffffffffffffffffffffffffffffff1681526020016000151581526020017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81526020017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8152602001600115158152509050600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000181908060018154018082558091505090600182039060005260206000209060050201600090919290919091506000820151816000019080519060200190610901929190610c27565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff021916908315150217905550606082015181600201556080820151816003015560a08201518160040160006101000a81548160ff021916908315150217905550505050806003836040518082805190602001908083835b602083106109d757805182526020820191506020810190506020830392506109b4565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206000820151816000019080519060200190610a26929190610c27565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff021916908315150217905550606082015181600201556080820151816003015560a08201518160040160006101000a81548160ff0219169083151502179055509050506002829080600181540180825580915050906001820390600052602060002001600090919290919091509080519060200190610b02929190610ca7565b50505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b415780548555610b7e565b82800160010185558215610b7e57600052602060002091601f016020900482015b82811115610b7d578254825591600101919060010190610b62565b5b509050610b8b9190610d27565b5090565b50805460018160011615610100020316600290046000825580601f10610bb55750610bd4565b601f016020900490600052602060002090810190610bd39190610d27565b5b50565b6040518060c0016040528060608152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160001515815260200160008152602001600081526020016000151581525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610c6857805160ff1916838001178555610c96565b82800160010185558215610c96579182015b82811115610c95578251825591602001919060010190610c7a565b5b509050610ca39190610d27565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610ce857805160ff1916838001178555610d16565b82800160010185558215610d16579182015b82811115610d15578251825591602001919060010190610cfa565b5b509050610d239190610d27565b5090565b610d4991905b80821115610d45576000816000905550600101610d2d565b5090565b9056fe46696e6765727072696e7420616c72656164792065786973747320696e2074686520646174616261736521a265627a7a723158209d310107832c06d9567df7037b996dd97fd4189f609ec8538897d442ef14cc8564736f6c63430005100032",
          "deployedBytecode": "0x6080604052600436106100295760003560e01c806320c4b78c1461002e5780636e298d35146100e9575b600080fd5b6100e76004803603602081101561004457600080fd5b810190808035906020019064010000000081111561006157600080fd5b82018360208201111561007357600080fd5b8035906020019184600183028401116401000000008311171561009557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506101b1565b005b3480156100f557600080fd5b506101af6004803603602081101561010c57600080fd5b810190808035906020019064010000000081111561012957600080fd5b82018360208201111561013b57600080fd5b8035906020019184600183028401116401000000008311171561015d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061070e565b005b60006003826040518082805190602001908083835b602083106101e957805182526020820191506020810190506020830392506101c6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390209050600115158160040160009054906101000a900460ff1615151480156102c05750600115156003836040518082805190602001908083835b602083106102785780518252602082019150602081019050602083039250610255565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060010160149054906101000a900460ff161515145b610332576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f4973206e6f7420666f722073616c65210000000000000000000000000000000081525060200191505060405180910390fd5b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156103f8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f546865206f776e65722063616e206e6f7420626520746865206275796572000081525060200191505060405180910390fd5b8060020154341015610472576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f5468652066756e647320617265206e6f742073756666696369656e740000000081525060200191505060405180910390fd5b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f193505050501580156104dc573d6000803e3d6000fd5b50338160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160048054905011156106775760008160030154905060046001600480549050038154811061054c57fe5b90600052602060002090600502016004828154811061056757fe5b90600052602060002090600502016000820181600001908054600181600116156101000203166002900461059c929190610b08565b506001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001820160149054906101000a900460ff168160010160146101000a81548160ff02191690831515021790555060028201548160020155600382015481600301556004820160009054906101000a900460ff168160040160006101000a81548160ff021916908315150217905550905050505b600480548061068257fe5b6001900381819060005260206000209060050201600080820160006106a79190610b8f565b6001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160146101000a81549060ff0219169055600282016000905560038201600090556004820160006101000a81549060ff0219169055505090555050565b600015156003826040518082805190602001908083835b602083106107485780518252602082019150602081019050602083039250610725565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060040160009054906101000a900460ff161515146107e4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b815260200180610d4d602b913960400191505060405180910390fd5b6107ec610bd7565b6040518060c001604052808381526020013373ffffffffffffffffffffffffffffffffffffffff1681526020016000151581526020017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81526020017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8152602001600115158152509050600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000181908060018154018082558091505090600182039060005260206000209060050201600090919290919091506000820151816000019080519060200190610901929190610c27565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff021916908315150217905550606082015181600201556080820151816003015560a08201518160040160006101000a81548160ff021916908315150217905550505050806003836040518082805190602001908083835b602083106109d757805182526020820191506020810190506020830392506109b4565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206000820151816000019080519060200190610a26929190610c27565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff021916908315150217905550606082015181600201556080820151816003015560a08201518160040160006101000a81548160ff0219169083151502179055509050506002829080600181540180825580915050906001820390600052602060002001600090919290919091509080519060200190610b02929190610ca7565b50505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b415780548555610b7e565b82800160010185558215610b7e57600052602060002091601f016020900482015b82811115610b7d578254825591600101919060010190610b62565b5b509050610b8b9190610d27565b5090565b50805460018160011615610100020316600290046000825580601f10610bb55750610bd4565b601f016020900490600052602060002090810190610bd39190610d27565b5b50565b6040518060c0016040528060608152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160001515815260200160008152602001600081526020016000151581525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610c6857805160ff1916838001178555610c96565b82800160010185558215610c96579182015b82811115610c95578251825591602001919060010190610c7a565b5b509050610ca39190610d27565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610ce857805160ff1916838001178555610d16565b82800160010185558215610d16579182015b82811115610d15578251825591602001919060010190610cfa565b5b509050610d239190610d27565b5090565b610d4991905b80821115610d45576000816000905550600101610d2d565b5090565b9056fe46696e6765727072696e7420616c72656164792065786973747320696e2074686520646174616261736521a265627a7a723158209d310107832c06d9567df7037b996dd97fd4189f609ec8538897d442ef14cc8564736f6c63430005100032",
          "sourceMap": "58:2631:1:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;58:2631:1;;;;;;;",
          "deployedSourceMap": "58:2631:1:-;;;;;;;;;;;;;;;;;;;;;;;;;;1817:867;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1817:867:1;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;1817:867:1;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;1817:867:1;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;1817:867:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;1817:867:1;;;;;;;;;;;;;;;:::i;:::-;;701:441;;8:9:-1;5:2;;;30:1;27;20:12;5:2;701:441:1;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;701:441:1;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;701:441:1;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;701:441:1;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;701:441:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;701:441:1;;;;;;;;;;;;;;;:::i;:::-;;1817:867;1893:27;1923:10;1934:12;1923:24;;;;;;;;;;;;;36:153:-1;66:2;61:3;58:11;36:153;;182:3;176:10;171:3;164:23;98:2;93:3;89:12;82:19;;123:2;118:3;114:12;107:19;;148:2;143:3;139:12;132:19;;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;1923:24:1;;;;;;;;;;;;;;;;;;;;;1893:54;;1986:4;1966:24;;:9;:16;;;;;;;;;;;;:24;;;:70;;;;;2032:4;1994:42;;:10;2005:12;1994:24;;;;;;;;;;;;;36:153:-1;66:2;61:3;58:11;36:153;;182:3;176:10;171:3;164:23;98:2;93:3;89:12;82:19;;123:2;118:3;114:12;107:19;;148:2;143:3;139:12;132:19;;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;1994:24:1;;;;;;;;;;;;;;;;;;;;;:34;;;;;;;;;;;;:42;;;1966:70;1958:108;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2099:9;:15;;;;;;;;;;;;2085:29;;:10;:29;;;;2077:72;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2181:9;:15;;;2168:9;:28;;2160:69;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2242:9;:15;;;;;;;;;;;;:24;;:35;2267:9;2242:35;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2242:35:1;2306:10;2288:9;:15;;;:28;;;;;;;;;;;;;;;;;;2511:1;2491:12;:19;;;;:21;2488:158;;;2529:10;2542:9;:22;;;2529:35;;2599:12;2632:1;2612:12;:19;;;;:21;2599:35;;;;;;;;;;;;;;;;;;2579:12;2592:5;2579:19;;;;;;;;;;;;;;;;;;:55;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2488:158;;2656:12;:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1817:867;;:::o;701:441::-;813:5;778:40;;:10;789:12;778:24;;;;;;;;;;;;;36:153:-1;66:2;61:3;58:11;36:153;;182:3;176:10;171:3;164:23;98:2;93:3;89:12;82:19;;123:2;118:3;114:12;107:19;;148:2;143:3;139:12;132:19;;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;778:24:1;;;;;;;;;;;;;;;;;;;;;:31;;;;;;;;;;;;:40;;;770:96;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;879:29;;:::i;:::-;911:68;;;;;;;;921:12;911:68;;;;935:10;911:68;;;;;;947:5;911:68;;;;;;959:2;911:68;;;;969:2;911:68;;;;974:4;911:68;;;;;879:100;;990:8;:20;999:10;990:20;;;;;;;;;;;;;;;:31;;1027:12;990:50;;39:1:-1;33:3;27:10;23:18;57:10;52:3;45:23;79:10;72:17;;0:93;990:50:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1080:12;1053:10;1064:12;1053:24;;;;;;;;;;;;;36:153:-1;66:2;61:3;58:11;36:153;;182:3;176:10;171:3;164:23;98:2;93:3;89:12;82:19;;123:2;118:3;114:12;107:19;;148:2;143:3;139:12;132:19;;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;1053:24:1;;;;;;;;;;;;;;;;;;;;;:39;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1103:12;1121;1103:31;;39:1:-1;33:3;27:10;23:18;57:10;52:3;45:23;79:10;72:17;;0:93;1103:31:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;701:441;;:::o;58:2631::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
          "source": "// SPDX-License-Identifier: MIT\r\npragma solidity 0.5.16;\r\ncontract idDatabase{\r\n\r\n    struct Account {\r\n        // string userName;\r\n        Copyright[] copyrights;\r\n        uint index; // to remember its index in the userAddresses array and avoid loops\r\n    }\r\n\r\n    struct Copyright {\r\n        string fingerprint;\r\n        address payable owner;\r\n        // string name;\r\n        // string comment;\r\n        bool isForSale;\r\n        uint price;\r\n        uint sellingIndex;\r\n        bool exists;\r\n    }\r\n\r\n    address[] userAddresses;\r\n    mapping (address => Account) accounts;\r\n\r\n    string[] fingerprints;\r\n    mapping (string => Copyright) copyrights;\r\n\r\n    Copyright[] itemsForSale;\r\n    \r\n    function addCopyright (string memory _fingerprint) public {\r\n        require(copyrights[_fingerprint].exists == false, \"Fingerprint already exists in the database!\");\r\n\r\n        Copyright memory newCopyright = Copyright(_fingerprint, msg.sender, false, uint(-1), uint(-1), true);\r\n        accounts[msg.sender].copyrights.push(newCopyright);\r\n\r\n        copyrights[_fingerprint] = newCopyright;\r\n        fingerprints.push(_fingerprint);\r\n    }\r\n\r\n    function sellCopyright(string memory _fingerprint, uint _price) private {\r\n        Copyright storage copyright = copyrights[_fingerprint];\r\n        require(copyright.exists == true, \"There is no such copyright saved on the blockchain\");\r\n        require(msg.sender == copyright.owner, \"Only the owner can call this function\");\r\n        require(copyright.isForSale == false,\r\n        \"This copyright is already for sale\");\r\n\r\n        copyright.isForSale = true;\r\n        copyright.price = _price;\r\n        copyright.sellingIndex = itemsForSale.length-1;\r\n\r\n        // todo ... accounts[msg.sender].copyrights ...\r\n\r\n        itemsForSale.push(copyright);\r\n    }\r\n\r\n    function buyCopyright(string memory _fingerprint) public payable {\r\n        Copyright storage copyright = copyrights[_fingerprint];\r\n        require(copyright.exists == true && copyrights[_fingerprint].isForSale == true,\r\n        \"Is not for sale!\");\r\n        require(msg.sender != copyright.owner, \"The owner can not be the buyer\");\r\n        require(msg.value >= copyright.price, \"The funds are not sufficient\");\r\n\r\n        copyright.owner.transfer(msg.value);\r\n        copyright.owner = msg.sender;\r\n\r\n        // todo delete the copyright from the sellers account\r\n        // todo add the copyright to the buyers account\r\n\r\n        // delete from itemsForSale\r\n        if(itemsForSale.length>1){ \r\n            uint index = copyright.sellingIndex;\r\n            itemsForSale[index]=itemsForSale[itemsForSale.length-1];\r\n        }\r\n        itemsForSale.pop();\r\n\r\n    }\r\n\r\n}",
          "sourcePath": "/mnt/d/Documents/Studia/Blockchain/Projekt/inflation/contracts/idDatabase.sol",
          "ast": {
            "absolutePath": "/mnt/d/Documents/Studia/Blockchain/Projekt/inflation/contracts/idDatabase.sol",
            "exportedSymbols": {
              "idDatabase": [
                304
              ]
            },
            "id": 305,
            "nodeType": "SourceUnit",
            "nodes": [
              {
                "id": 58,
                "literals": [
                  "solidity",
                  "0.5",
                  ".16"
                ],
                "nodeType": "PragmaDirective",
                "src": "33:23:1"
              },
              {
                "baseContracts": [],
                "contractDependencies": [],
                "contractKind": "contract",
                "documentation": null,
                "fullyImplemented": true,
                "id": 304,
                "linearizedBaseContracts": [
                  304
                ],
                "name": "idDatabase",
                "nodeType": "ContractDefinition",
                "nodes": [
                  {
                    "canonicalName": "idDatabase.Account",
                    "id": 64,
                    "members": [
                      {
                        "constant": false,
                        "id": 61,
                        "name": "copyrights",
                        "nodeType": "VariableDeclaration",
                        "scope": 64,
                        "src": "141:22:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage_ptr",
                          "typeString": "struct idDatabase.Copyright[]"
                        },
                        "typeName": {
                          "baseType": {
                            "contractScope": null,
                            "id": 59,
                            "name": "Copyright",
                            "nodeType": "UserDefinedTypeName",
                            "referencedDeclaration": 77,
                            "src": "141:9:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                              "typeString": "struct idDatabase.Copyright"
                            }
                          },
                          "id": 60,
                          "length": null,
                          "nodeType": "ArrayTypeName",
                          "src": "141:11:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage_ptr",
                            "typeString": "struct idDatabase.Copyright[]"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 63,
                        "name": "index",
                        "nodeType": "VariableDeclaration",
                        "scope": 64,
                        "src": "174:10:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 62,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "174:4:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "name": "Account",
                    "nodeType": "StructDefinition",
                    "scope": 304,
                    "src": "86:174:1",
                    "visibility": "public"
                  },
                  {
                    "canonicalName": "idDatabase.Copyright",
                    "id": 77,
                    "members": [
                      {
                        "constant": false,
                        "id": 66,
                        "name": "fingerprint",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "296:18:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage_ptr",
                          "typeString": "string"
                        },
                        "typeName": {
                          "id": 65,
                          "name": "string",
                          "nodeType": "ElementaryTypeName",
                          "src": "296:6:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_storage_ptr",
                            "typeString": "string"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 68,
                        "name": "owner",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "325:21:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        "typeName": {
                          "id": 67,
                          "name": "address",
                          "nodeType": "ElementaryTypeName",
                          "src": "325:15:1",
                          "stateMutability": "payable",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 70,
                        "name": "isForSale",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "410:14:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "typeName": {
                          "id": 69,
                          "name": "bool",
                          "nodeType": "ElementaryTypeName",
                          "src": "410:4:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 72,
                        "name": "price",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "435:10:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 71,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "435:4:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 74,
                        "name": "sellingIndex",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "456:17:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 73,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "456:4:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 76,
                        "name": "exists",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "484:11:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "typeName": {
                          "id": 75,
                          "name": "bool",
                          "nodeType": "ElementaryTypeName",
                          "src": "484:4:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "name": "Copyright",
                    "nodeType": "StructDefinition",
                    "scope": 304,
                    "src": "268:235:1",
                    "visibility": "public"
                  },
                  {
                    "constant": false,
                    "id": 80,
                    "name": "userAddresses",
                    "nodeType": "VariableDeclaration",
                    "scope": 304,
                    "src": "511:23:1",
                    "stateVariable": true,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 78,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "511:7:1",
                        "stateMutability": "nonpayable",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "id": 79,
                      "length": null,
                      "nodeType": "ArrayTypeName",
                      "src": "511:9:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                        "typeString": "address[]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 84,
                    "name": "accounts",
                    "nodeType": "VariableDeclaration",
                    "scope": 304,
                    "src": "541:37:1",
                    "stateVariable": true,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_mapping$_t_address_$_t_struct$_Account_$64_storage_$",
                      "typeString": "mapping(address => struct idDatabase.Account)"
                    },
                    "typeName": {
                      "id": 83,
                      "keyType": {
                        "id": 81,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "550:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "nodeType": "Mapping",
                      "src": "541:28:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_struct$_Account_$64_storage_$",
                        "typeString": "mapping(address => struct idDatabase.Account)"
                      },
                      "valueType": {
                        "contractScope": null,
                        "id": 82,
                        "name": "Account",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 64,
                        "src": "561:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Account_$64_storage_ptr",
                          "typeString": "struct idDatabase.Account"
                        }
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 87,
                    "name": "fingerprints",
                    "nodeType": "VariableDeclaration",
                    "scope": 304,
                    "src": "587:21:1",
                    "stateVariable": true,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_string_storage_$dyn_storage",
                      "typeString": "string[]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 85,
                        "name": "string",
                        "nodeType": "ElementaryTypeName",
                        "src": "587:6:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage_ptr",
                          "typeString": "string"
                        }
                      },
                      "id": 86,
                      "length": null,
                      "nodeType": "ArrayTypeName",
                      "src": "587:8:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_string_storage_$dyn_storage_ptr",
                        "typeString": "string[]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 91,
                    "name": "copyrights",
                    "nodeType": "VariableDeclaration",
                    "scope": 304,
                    "src": "615:40:1",
                    "stateVariable": true,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                      "typeString": "mapping(string => struct idDatabase.Copyright)"
                    },
                    "typeName": {
                      "id": 90,
                      "keyType": {
                        "id": 88,
                        "name": "string",
                        "nodeType": "ElementaryTypeName",
                        "src": "624:6:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage_ptr",
                          "typeString": "string"
                        }
                      },
                      "nodeType": "Mapping",
                      "src": "615:29:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                        "typeString": "mapping(string => struct idDatabase.Copyright)"
                      },
                      "valueType": {
                        "contractScope": null,
                        "id": 89,
                        "name": "Copyright",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 77,
                        "src": "634:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                          "typeString": "struct idDatabase.Copyright"
                        }
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 94,
                    "name": "itemsForSale",
                    "nodeType": "VariableDeclaration",
                    "scope": 304,
                    "src": "664:24:1",
                    "stateVariable": true,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                      "typeString": "struct idDatabase.Copyright[]"
                    },
                    "typeName": {
                      "baseType": {
                        "contractScope": null,
                        "id": 92,
                        "name": "Copyright",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 77,
                        "src": "664:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                          "typeString": "struct idDatabase.Copyright"
                        }
                      },
                      "id": 93,
                      "length": null,
                      "nodeType": "ArrayTypeName",
                      "src": "664:11:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage_ptr",
                        "typeString": "struct idDatabase.Copyright[]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "body": {
                      "id": 148,
                      "nodeType": "Block",
                      "src": "759:383:1",
                      "statements": [
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "id": 105,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "baseExpression": {
                                      "argumentTypes": null,
                                      "id": 100,
                                      "name": "copyrights",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 91,
                                      "src": "778:10:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                                        "typeString": "mapping(string memory => struct idDatabase.Copyright storage ref)"
                                      }
                                    },
                                    "id": 102,
                                    "indexExpression": {
                                      "argumentTypes": null,
                                      "id": 101,
                                      "name": "_fingerprint",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 96,
                                      "src": "789:12:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_string_memory_ptr",
                                        "typeString": "string memory"
                                      }
                                    },
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "nodeType": "IndexAccess",
                                    "src": "778:24:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                      "typeString": "struct idDatabase.Copyright storage ref"
                                    }
                                  },
                                  "id": 103,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "exists",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 76,
                                  "src": "778:31:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "==",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "hexValue": "66616c7365",
                                  "id": 104,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "bool",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "813:5:1",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "value": "false"
                                },
                                "src": "778:40:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "46696e6765727072696e7420616c72656164792065786973747320696e2074686520646174616261736521",
                                "id": 106,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "820:45:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_7fd9ea80bd09883f37398d80dd46a7aaf9764825cdce52d825fb6c06d1402be1",
                                  "typeString": "literal_string \"Fingerprint already exists in the database!\""
                                },
                                "value": "Fingerprint already exists in the database!"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_7fd9ea80bd09883f37398d80dd46a7aaf9764825cdce52d825fb6c06d1402be1",
                                  "typeString": "literal_string \"Fingerprint already exists in the database!\""
                                }
                              ],
                              "id": 99,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "770:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 107,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "770:96:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 108,
                          "nodeType": "ExpressionStatement",
                          "src": "770:96:1"
                        },
                        {
                          "assignments": [
                            110
                          ],
                          "declarations": [
                            {
                              "constant": false,
                              "id": 110,
                              "name": "newCopyright",
                              "nodeType": "VariableDeclaration",
                              "scope": 148,
                              "src": "879:29:1",
                              "stateVariable": false,
                              "storageLocation": "memory",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Copyright_$77_memory_ptr",
                                "typeString": "struct idDatabase.Copyright"
                              },
                              "typeName": {
                                "contractScope": null,
                                "id": 109,
                                "name": "Copyright",
                                "nodeType": "UserDefinedTypeName",
                                "referencedDeclaration": 77,
                                "src": "879:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright"
                                }
                              },
                              "value": null,
                              "visibility": "internal"
                            }
                          ],
                          "id": 126,
                          "initialValue": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 112,
                                "name": "_fingerprint",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 96,
                                "src": "921:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 113,
                                  "name": "msg",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 838,
                                  "src": "935:3:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_message",
                                    "typeString": "msg"
                                  }
                                },
                                "id": 114,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "sender",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "935:10:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "66616c7365",
                                "id": 115,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "bool",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "947:5:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "value": "false"
                              },
                              {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 118,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "lValueRequested": false,
                                    "nodeType": "UnaryOperation",
                                    "operator": "-",
                                    "prefix": true,
                                    "src": "959:2:1",
                                    "subExpression": {
                                      "argumentTypes": null,
                                      "hexValue": "31",
                                      "id": 117,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "960:1:1",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_rational_minus_1_by_1",
                                      "typeString": "int_const -1"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_rational_minus_1_by_1",
                                      "typeString": "int_const -1"
                                    }
                                  ],
                                  "id": 116,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "nodeType": "ElementaryTypeNameExpression",
                                  "src": "954:4:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_uint256_$",
                                    "typeString": "type(uint256)"
                                  },
                                  "typeName": "uint"
                                },
                                "id": 119,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "954:8:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 122,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "lValueRequested": false,
                                    "nodeType": "UnaryOperation",
                                    "operator": "-",
                                    "prefix": true,
                                    "src": "969:2:1",
                                    "subExpression": {
                                      "argumentTypes": null,
                                      "hexValue": "31",
                                      "id": 121,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "970:1:1",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_rational_minus_1_by_1",
                                      "typeString": "int_const -1"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_rational_minus_1_by_1",
                                      "typeString": "int_const -1"
                                    }
                                  ],
                                  "id": 120,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "nodeType": "ElementaryTypeNameExpression",
                                  "src": "964:4:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_uint256_$",
                                    "typeString": "type(uint256)"
                                  },
                                  "typeName": "uint"
                                },
                                "id": 123,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "964:8:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "74727565",
                                "id": 124,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "bool",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "974:4:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "value": "true"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                },
                                {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "id": 111,
                              "name": "Copyright",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 77,
                              "src": "911:9:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_struct$_Copyright_$77_storage_ptr_$",
                                "typeString": "type(struct idDatabase.Copyright storage pointer)"
                              }
                            },
                            "id": 125,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "structConstructorCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "911:68:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_Copyright_$77_memory",
                              "typeString": "struct idDatabase.Copyright memory"
                            }
                          },
                          "nodeType": "VariableDeclarationStatement",
                          "src": "879:100:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 133,
                                "name": "newCopyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 110,
                                "src": "1027:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_memory_ptr",
                                  "typeString": "struct idDatabase.Copyright memory"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_struct$_Copyright_$77_memory_ptr",
                                  "typeString": "struct idDatabase.Copyright memory"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 127,
                                    "name": "accounts",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 84,
                                    "src": "990:8:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_mapping$_t_address_$_t_struct$_Account_$64_storage_$",
                                      "typeString": "mapping(address => struct idDatabase.Account storage ref)"
                                    }
                                  },
                                  "id": 130,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 128,
                                      "name": "msg",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 838,
                                      "src": "999:3:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_magic_message",
                                        "typeString": "msg"
                                      }
                                    },
                                    "id": 129,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "sender",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": null,
                                    "src": "999:10:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address_payable",
                                      "typeString": "address payable"
                                    }
                                  },
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "nodeType": "IndexAccess",
                                  "src": "990:20:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_Account_$64_storage",
                                    "typeString": "struct idDatabase.Account storage ref"
                                  }
                                },
                                "id": 131,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "copyrights",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 61,
                                "src": "990:31:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                  "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                }
                              },
                              "id": 132,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "push",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "990:36:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_arraypush_nonpayable$_t_struct$_Copyright_$77_storage_$returns$_t_uint256_$",
                                "typeString": "function (struct idDatabase.Copyright storage ref) returns (uint256)"
                              }
                            },
                            "id": 134,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "990:50:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 135,
                          "nodeType": "ExpressionStatement",
                          "src": "990:50:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "id": 140,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftHandSide": {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 136,
                                "name": "copyrights",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 91,
                                "src": "1053:10:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                                  "typeString": "mapping(string memory => struct idDatabase.Copyright storage ref)"
                                }
                              },
                              "id": 138,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 137,
                                "name": "_fingerprint",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 96,
                                "src": "1064:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "nodeType": "IndexAccess",
                              "src": "1053:24:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                "typeString": "struct idDatabase.Copyright storage ref"
                              }
                            },
                            "nodeType": "Assignment",
                            "operator": "=",
                            "rightHandSide": {
                              "argumentTypes": null,
                              "id": 139,
                              "name": "newCopyright",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 110,
                              "src": "1080:12:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Copyright_$77_memory_ptr",
                                "typeString": "struct idDatabase.Copyright memory"
                              }
                            },
                            "src": "1053:39:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_Copyright_$77_storage",
                              "typeString": "struct idDatabase.Copyright storage ref"
                            }
                          },
                          "id": 141,
                          "nodeType": "ExpressionStatement",
                          "src": "1053:39:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 145,
                                "name": "_fingerprint",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 96,
                                "src": "1121:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "id": 142,
                                "name": "fingerprints",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 87,
                                "src": "1103:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_string_storage_$dyn_storage",
                                  "typeString": "string storage ref[] storage ref"
                                }
                              },
                              "id": 144,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "push",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "1103:17:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_arraypush_nonpayable$_t_string_storage_$returns$_t_uint256_$",
                                "typeString": "function (string storage ref) returns (uint256)"
                              }
                            },
                            "id": 146,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1103:31:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 147,
                          "nodeType": "ExpressionStatement",
                          "src": "1103:31:1"
                        }
                      ]
                    },
                    "documentation": null,
                    "id": 149,
                    "implemented": true,
                    "kind": "function",
                    "modifiers": [],
                    "name": "addCopyright",
                    "nodeType": "FunctionDefinition",
                    "parameters": {
                      "id": 97,
                      "nodeType": "ParameterList",
                      "parameters": [
                        {
                          "constant": false,
                          "id": 96,
                          "name": "_fingerprint",
                          "nodeType": "VariableDeclaration",
                          "scope": 149,
                          "src": "724:26:1",
                          "stateVariable": false,
                          "storageLocation": "memory",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string"
                          },
                          "typeName": {
                            "id": 95,
                            "name": "string",
                            "nodeType": "ElementaryTypeName",
                            "src": "724:6:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_storage_ptr",
                              "typeString": "string"
                            }
                          },
                          "value": null,
                          "visibility": "internal"
                        }
                      ],
                      "src": "723:28:1"
                    },
                    "returnParameters": {
                      "id": 98,
                      "nodeType": "ParameterList",
                      "parameters": [],
                      "src": "759:0:1"
                    },
                    "scope": 304,
                    "src": "701:441:1",
                    "stateMutability": "nonpayable",
                    "superFunction": null,
                    "visibility": "public"
                  },
                  {
                    "body": {
                      "id": 214,
                      "nodeType": "Block",
                      "src": "1222:587:1",
                      "statements": [
                        {
                          "assignments": [
                            157
                          ],
                          "declarations": [
                            {
                              "constant": false,
                              "id": 157,
                              "name": "copyright",
                              "nodeType": "VariableDeclaration",
                              "scope": 214,
                              "src": "1233:27:1",
                              "stateVariable": false,
                              "storageLocation": "storage",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                "typeString": "struct idDatabase.Copyright"
                              },
                              "typeName": {
                                "contractScope": null,
                                "id": 156,
                                "name": "Copyright",
                                "nodeType": "UserDefinedTypeName",
                                "referencedDeclaration": 77,
                                "src": "1233:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright"
                                }
                              },
                              "value": null,
                              "visibility": "internal"
                            }
                          ],
                          "id": 161,
                          "initialValue": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 158,
                              "name": "copyrights",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 91,
                              "src": "1263:10:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                                "typeString": "mapping(string memory => struct idDatabase.Copyright storage ref)"
                              }
                            },
                            "id": 160,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 159,
                              "name": "_fingerprint",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 151,
                              "src": "1274:12:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_string_memory_ptr",
                                "typeString": "string memory"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "1263:24:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_Copyright_$77_storage",
                              "typeString": "struct idDatabase.Copyright storage ref"
                            }
                          },
                          "nodeType": "VariableDeclarationStatement",
                          "src": "1233:54:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "id": 166,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 163,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 157,
                                    "src": "1306:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 164,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "exists",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 76,
                                  "src": "1306:16:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "==",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "hexValue": "74727565",
                                  "id": 165,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "bool",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "1326:4:1",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "value": "true"
                                },
                                "src": "1306:24:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "5468657265206973206e6f207375636820636f70797269676874207361766564206f6e2074686520626c6f636b636861696e",
                                "id": 167,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "1332:52:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_94c9660b531fdc9346e211a06d927eecb0163871ff735f6517971ef722461af4",
                                  "typeString": "literal_string \"There is no such copyright saved on the blockchain\""
                                },
                                "value": "There is no such copyright saved on the blockchain"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_94c9660b531fdc9346e211a06d927eecb0163871ff735f6517971ef722461af4",
                                  "typeString": "literal_string \"There is no such copyright saved on the blockchain\""
                                }
                              ],
                              "id": 162,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "1298:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 168,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1298:87:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 169,
                          "nodeType": "ExpressionStatement",
                          "src": "1298:87:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                "id": 175,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 171,
                                    "name": "msg",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 838,
                                    "src": "1404:3:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_magic_message",
                                      "typeString": "msg"
                                    }
                                  },
                                  "id": 172,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "sender",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "1404:10:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address_payable",
                                    "typeString": "address payable"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "==",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 173,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 157,
                                    "src": "1418:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 174,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "owner",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 68,
                                  "src": "1418:15:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address_payable",
                                    "typeString": "address payable"
                                  }
                                },
                                "src": "1404:29:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "4f6e6c7920746865206f776e65722063616e2063616c6c20746869732066756e6374696f6e",
                                "id": 176,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "1435:39:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_02c4ea565ba5dd10ca7507fa4aece08fe60d2b6b945dff193cdbce1647b7face",
                                  "typeString": "literal_string \"Only the owner can call this function\""
                                },
                                "value": "Only the owner can call this function"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_02c4ea565ba5dd10ca7507fa4aece08fe60d2b6b945dff193cdbce1647b7face",
                                  "typeString": "literal_string \"Only the owner can call this function\""
                                }
                              ],
                              "id": 170,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "1396:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 177,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1396:79:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 178,
                          "nodeType": "ExpressionStatement",
                          "src": "1396:79:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "id": 183,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 180,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 157,
                                    "src": "1494:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 181,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "isForSale",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 70,
                                  "src": "1494:19:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "==",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "hexValue": "66616c7365",
                                  "id": 182,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "bool",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "1517:5:1",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "value": "false"
                                },
                                "src": "1494:28:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "5468697320636f7079726967687420697320616c726561647920666f722073616c65",
                                "id": 184,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "1533:36:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_2207a323d31b5123e695d54308c99f7ceda852c7ecf2bb7d0b3738fa7d4b7e2f",
                                  "typeString": "literal_string \"This copyright is already for sale\""
                                },
                                "value": "This copyright is already for sale"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_2207a323d31b5123e695d54308c99f7ceda852c7ecf2bb7d0b3738fa7d4b7e2f",
                                  "typeString": "literal_string \"This copyright is already for sale\""
                                }
                              ],
                              "id": 179,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "1486:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 185,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1486:84:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 186,
                          "nodeType": "ExpressionStatement",
                          "src": "1486:84:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "id": 191,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftHandSide": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 187,
                                "name": "copyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 157,
                                "src": "1583:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              },
                              "id": 189,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "memberName": "isForSale",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 70,
                              "src": "1583:19:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              }
                            },
                            "nodeType": "Assignment",
                            "operator": "=",
                            "rightHandSide": {
                              "argumentTypes": null,
                              "hexValue": "74727565",
                              "id": 190,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "bool",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1605:4:1",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              },
                              "value": "true"
                            },
                            "src": "1583:26:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            }
                          },
                          "id": 192,
                          "nodeType": "ExpressionStatement",
                          "src": "1583:26:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "id": 197,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftHandSide": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 193,
                                "name": "copyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 157,
                                "src": "1620:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              },
                              "id": 195,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "memberName": "price",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 72,
                              "src": "1620:15:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "nodeType": "Assignment",
                            "operator": "=",
                            "rightHandSide": {
                              "argumentTypes": null,
                              "id": 196,
                              "name": "_price",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 153,
                              "src": "1638:6:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "src": "1620:24:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 198,
                          "nodeType": "ExpressionStatement",
                          "src": "1620:24:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "id": 206,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftHandSide": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 199,
                                "name": "copyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 157,
                                "src": "1655:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              },
                              "id": 201,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "memberName": "sellingIndex",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 74,
                              "src": "1655:22:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "nodeType": "Assignment",
                            "operator": "=",
                            "rightHandSide": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "id": 205,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "leftExpression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 202,
                                  "name": "itemsForSale",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 94,
                                  "src": "1680:12:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                    "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                  }
                                },
                                "id": 203,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "length",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "1680:19:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "nodeType": "BinaryOperation",
                              "operator": "-",
                              "rightExpression": {
                                "argumentTypes": null,
                                "hexValue": "31",
                                "id": 204,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "number",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "1700:1:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_rational_1_by_1",
                                  "typeString": "int_const 1"
                                },
                                "value": "1"
                              },
                              "src": "1680:21:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "src": "1655:46:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 207,
                          "nodeType": "ExpressionStatement",
                          "src": "1655:46:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 211,
                                "name": "copyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 157,
                                "src": "1791:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "id": 208,
                                "name": "itemsForSale",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 94,
                                "src": "1773:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                  "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                }
                              },
                              "id": 210,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "push",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "1773:17:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_arraypush_nonpayable$_t_struct$_Copyright_$77_storage_$returns$_t_uint256_$",
                                "typeString": "function (struct idDatabase.Copyright storage ref) returns (uint256)"
                              }
                            },
                            "id": 212,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1773:28:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 213,
                          "nodeType": "ExpressionStatement",
                          "src": "1773:28:1"
                        }
                      ]
                    },
                    "documentation": null,
                    "id": 215,
                    "implemented": true,
                    "kind": "function",
                    "modifiers": [],
                    "name": "sellCopyright",
                    "nodeType": "FunctionDefinition",
                    "parameters": {
                      "id": 154,
                      "nodeType": "ParameterList",
                      "parameters": [
                        {
                          "constant": false,
                          "id": 151,
                          "name": "_fingerprint",
                          "nodeType": "VariableDeclaration",
                          "scope": 215,
                          "src": "1173:26:1",
                          "stateVariable": false,
                          "storageLocation": "memory",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string"
                          },
                          "typeName": {
                            "id": 150,
                            "name": "string",
                            "nodeType": "ElementaryTypeName",
                            "src": "1173:6:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_storage_ptr",
                              "typeString": "string"
                            }
                          },
                          "value": null,
                          "visibility": "internal"
                        },
                        {
                          "constant": false,
                          "id": 153,
                          "name": "_price",
                          "nodeType": "VariableDeclaration",
                          "scope": 215,
                          "src": "1201:11:1",
                          "stateVariable": false,
                          "storageLocation": "default",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "typeName": {
                            "id": 152,
                            "name": "uint",
                            "nodeType": "ElementaryTypeName",
                            "src": "1201:4:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "value": null,
                          "visibility": "internal"
                        }
                      ],
                      "src": "1172:41:1"
                    },
                    "returnParameters": {
                      "id": 155,
                      "nodeType": "ParameterList",
                      "parameters": [],
                      "src": "1222:0:1"
                    },
                    "scope": 304,
                    "src": "1150:659:1",
                    "stateMutability": "nonpayable",
                    "superFunction": null,
                    "visibility": "private"
                  },
                  {
                    "body": {
                      "id": 302,
                      "nodeType": "Block",
                      "src": "1882:802:1",
                      "statements": [
                        {
                          "assignments": [
                            221
                          ],
                          "declarations": [
                            {
                              "constant": false,
                              "id": 221,
                              "name": "copyright",
                              "nodeType": "VariableDeclaration",
                              "scope": 302,
                              "src": "1893:27:1",
                              "stateVariable": false,
                              "storageLocation": "storage",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                "typeString": "struct idDatabase.Copyright"
                              },
                              "typeName": {
                                "contractScope": null,
                                "id": 220,
                                "name": "Copyright",
                                "nodeType": "UserDefinedTypeName",
                                "referencedDeclaration": 77,
                                "src": "1893:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright"
                                }
                              },
                              "value": null,
                              "visibility": "internal"
                            }
                          ],
                          "id": 225,
                          "initialValue": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 222,
                              "name": "copyrights",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 91,
                              "src": "1923:10:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                                "typeString": "mapping(string memory => struct idDatabase.Copyright storage ref)"
                              }
                            },
                            "id": 224,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 223,
                              "name": "_fingerprint",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 217,
                              "src": "1934:12:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_string_memory_ptr",
                                "typeString": "string memory"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "1923:24:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_Copyright_$77_storage",
                              "typeString": "struct idDatabase.Copyright storage ref"
                            }
                          },
                          "nodeType": "VariableDeclarationStatement",
                          "src": "1893:54:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "id": 237,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "commonType": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "id": 230,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "leftExpression": {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 227,
                                      "name": "copyright",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 221,
                                      "src": "1966:9:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                        "typeString": "struct idDatabase.Copyright storage pointer"
                                      }
                                    },
                                    "id": 228,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "exists",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 76,
                                    "src": "1966:16:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_bool",
                                      "typeString": "bool"
                                    }
                                  },
                                  "nodeType": "BinaryOperation",
                                  "operator": "==",
                                  "rightExpression": {
                                    "argumentTypes": null,
                                    "hexValue": "74727565",
                                    "id": 229,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "kind": "bool",
                                    "lValueRequested": false,
                                    "nodeType": "Literal",
                                    "src": "1986:4:1",
                                    "subdenomination": null,
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_bool",
                                      "typeString": "bool"
                                    },
                                    "value": "true"
                                  },
                                  "src": "1966:24:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "&&",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "commonType": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "id": 236,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "leftExpression": {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "baseExpression": {
                                        "argumentTypes": null,
                                        "id": 231,
                                        "name": "copyrights",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 91,
                                        "src": "1994:10:1",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                                          "typeString": "mapping(string memory => struct idDatabase.Copyright storage ref)"
                                        }
                                      },
                                      "id": 233,
                                      "indexExpression": {
                                        "argumentTypes": null,
                                        "id": 232,
                                        "name": "_fingerprint",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 217,
                                        "src": "2005:12:1",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_string_memory_ptr",
                                          "typeString": "string memory"
                                        }
                                      },
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "nodeType": "IndexAccess",
                                      "src": "1994:24:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                        "typeString": "struct idDatabase.Copyright storage ref"
                                      }
                                    },
                                    "id": 234,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "isForSale",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 70,
                                    "src": "1994:34:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_bool",
                                      "typeString": "bool"
                                    }
                                  },
                                  "nodeType": "BinaryOperation",
                                  "operator": "==",
                                  "rightExpression": {
                                    "argumentTypes": null,
                                    "hexValue": "74727565",
                                    "id": 235,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "kind": "bool",
                                    "lValueRequested": false,
                                    "nodeType": "Literal",
                                    "src": "2032:4:1",
                                    "subdenomination": null,
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_bool",
                                      "typeString": "bool"
                                    },
                                    "value": "true"
                                  },
                                  "src": "1994:42:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  }
                                },
                                "src": "1966:70:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "4973206e6f7420666f722073616c6521",
                                "id": 238,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "2047:18:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_945d981991fe8f9d0ed645cce8eba653dea3e3be67c6aec7f2d5b228dea1d929",
                                  "typeString": "literal_string \"Is not for sale!\""
                                },
                                "value": "Is not for sale!"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_945d981991fe8f9d0ed645cce8eba653dea3e3be67c6aec7f2d5b228dea1d929",
                                  "typeString": "literal_string \"Is not for sale!\""
                                }
                              ],
                              "id": 226,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "1958:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 239,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1958:108:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 240,
                          "nodeType": "ExpressionStatement",
                          "src": "1958:108:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                "id": 246,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 242,
                                    "name": "msg",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 838,
                                    "src": "2085:3:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_magic_message",
                                      "typeString": "msg"
                                    }
                                  },
                                  "id": 243,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "sender",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "2085:10:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address_payable",
                                    "typeString": "address payable"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "!=",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 244,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 221,
                                    "src": "2099:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 245,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "owner",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 68,
                                  "src": "2099:15:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address_payable",
                                    "typeString": "address payable"
                                  }
                                },
                                "src": "2085:29:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "546865206f776e65722063616e206e6f7420626520746865206275796572",
                                "id": 247,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "2116:32:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_98d6e6fd29f00b413c0aad920b9aed5b3dc246fbd9e33c8d1735fc4b79957383",
                                  "typeString": "literal_string \"The owner can not be the buyer\""
                                },
                                "value": "The owner can not be the buyer"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_98d6e6fd29f00b413c0aad920b9aed5b3dc246fbd9e33c8d1735fc4b79957383",
                                  "typeString": "literal_string \"The owner can not be the buyer\""
                                }
                              ],
                              "id": 241,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "2077:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 248,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2077:72:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 249,
                          "nodeType": "ExpressionStatement",
                          "src": "2077:72:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                "id": 255,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 251,
                                    "name": "msg",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 838,
                                    "src": "2168:3:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_magic_message",
                                      "typeString": "msg"
                                    }
                                  },
                                  "id": 252,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "value",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "2168:9:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": ">=",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 253,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 221,
                                    "src": "2181:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 254,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "price",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 72,
                                  "src": "2181:15:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "src": "2168:28:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "5468652066756e647320617265206e6f742073756666696369656e74",
                                "id": 256,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "2198:30:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_556ad67d0b08ddb22809fde7f292cd50dee9e45cd0f4b26ffb971e0d8489a6e8",
                                  "typeString": "literal_string \"The funds are not sufficient\""
                                },
                                "value": "The funds are not sufficient"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_556ad67d0b08ddb22809fde7f292cd50dee9e45cd0f4b26ffb971e0d8489a6e8",
                                  "typeString": "literal_string \"The funds are not sufficient\""
                                }
                              ],
                              "id": 250,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "2160:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 257,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2160:69:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 258,
                          "nodeType": "ExpressionStatement",
                          "src": "2160:69:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 264,
                                  "name": "msg",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 838,
                                  "src": "2267:3:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_message",
                                    "typeString": "msg"
                                  }
                                },
                                "id": 265,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "value",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "2267:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 259,
                                  "name": "copyright",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 221,
                                  "src": "2242:9:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                    "typeString": "struct idDatabase.Copyright storage pointer"
                                  }
                                },
                                "id": 262,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "owner",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 68,
                                "src": "2242:15:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                }
                              },
                              "id": 263,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "transfer",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "2242:24:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
                                "typeString": "function (uint256)"
                              }
                            },
                            "id": 266,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2242:35:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 267,
                          "nodeType": "ExpressionStatement",
                          "src": "2242:35:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "id": 273,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftHandSide": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 268,
                                "name": "copyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 221,
                                "src": "2288:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              },
                              "id": 270,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "memberName": "owner",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 68,
                              "src": "2288:15:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            "nodeType": "Assignment",
                            "operator": "=",
                            "rightHandSide": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 271,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 838,
                                "src": "2306:3:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 272,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "sender",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "2306:10:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            "src": "2288:28:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            }
                          },
                          "id": 274,
                          "nodeType": "ExpressionStatement",
                          "src": "2288:28:1"
                        },
                        {
                          "condition": {
                            "argumentTypes": null,
                            "commonType": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "id": 278,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftExpression": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 275,
                                "name": "itemsForSale",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 94,
                                "src": "2491:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                  "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                }
                              },
                              "id": 276,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "length",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "2491:19:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "nodeType": "BinaryOperation",
                            "operator": ">",
                            "rightExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 277,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2511:1:1",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "src": "2491:21:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            }
                          },
                          "falseBody": null,
                          "id": 296,
                          "nodeType": "IfStatement",
                          "src": "2488:158:1",
                          "trueBody": {
                            "id": 295,
                            "nodeType": "Block",
                            "src": "2513:133:1",
                            "statements": [
                              {
                                "assignments": [
                                  280
                                ],
                                "declarations": [
                                  {
                                    "constant": false,
                                    "id": 280,
                                    "name": "index",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 295,
                                    "src": "2529:10:1",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "typeName": {
                                      "id": 279,
                                      "name": "uint",
                                      "nodeType": "ElementaryTypeName",
                                      "src": "2529:4:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                      }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                  }
                                ],
                                "id": 283,
                                "initialValue": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 281,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 221,
                                    "src": "2542:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 282,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "sellingIndex",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 74,
                                  "src": "2542:22:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "nodeType": "VariableDeclarationStatement",
                                "src": "2529:35:1"
                              },
                              {
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 293,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "leftHandSide": {
                                    "argumentTypes": null,
                                    "baseExpression": {
                                      "argumentTypes": null,
                                      "id": 284,
                                      "name": "itemsForSale",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 94,
                                      "src": "2579:12:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                        "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                      }
                                    },
                                    "id": 286,
                                    "indexExpression": {
                                      "argumentTypes": null,
                                      "id": 285,
                                      "name": "index",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 280,
                                      "src": "2592:5:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                      }
                                    },
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": true,
                                    "nodeType": "IndexAccess",
                                    "src": "2579:19:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                      "typeString": "struct idDatabase.Copyright storage ref"
                                    }
                                  },
                                  "nodeType": "Assignment",
                                  "operator": "=",
                                  "rightHandSide": {
                                    "argumentTypes": null,
                                    "baseExpression": {
                                      "argumentTypes": null,
                                      "id": 287,
                                      "name": "itemsForSale",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 94,
                                      "src": "2599:12:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                        "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                      }
                                    },
                                    "id": 292,
                                    "indexExpression": {
                                      "argumentTypes": null,
                                      "commonType": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                      },
                                      "id": 291,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "leftExpression": {
                                        "argumentTypes": null,
                                        "expression": {
                                          "argumentTypes": null,
                                          "id": 288,
                                          "name": "itemsForSale",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 94,
                                          "src": "2612:12:1",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                            "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                          }
                                        },
                                        "id": 289,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "length",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": null,
                                        "src": "2612:19:1",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_uint256",
                                          "typeString": "uint256"
                                        }
                                      },
                                      "nodeType": "BinaryOperation",
                                      "operator": "-",
                                      "rightExpression": {
                                        "argumentTypes": null,
                                        "hexValue": "31",
                                        "id": 290,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": true,
                                        "kind": "number",
                                        "lValueRequested": false,
                                        "nodeType": "Literal",
                                        "src": "2632:1:1",
                                        "subdenomination": null,
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_rational_1_by_1",
                                          "typeString": "int_const 1"
                                        },
                                        "value": "1"
                                      },
                                      "src": "2612:21:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                      }
                                    },
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "nodeType": "IndexAccess",
                                    "src": "2599:35:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                      "typeString": "struct idDatabase.Copyright storage ref"
                                    }
                                  },
                                  "src": "2579:55:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                    "typeString": "struct idDatabase.Copyright storage ref"
                                  }
                                },
                                "id": 294,
                                "nodeType": "ExpressionStatement",
                                "src": "2579:55:1"
                              }
                            ]
                          }
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [],
                            "expression": {
                              "argumentTypes": [],
                              "expression": {
                                "argumentTypes": null,
                                "id": 297,
                                "name": "itemsForSale",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 94,
                                "src": "2656:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                  "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                }
                              },
                              "id": 299,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "pop",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "2656:16:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_arraypop_nonpayable$__$returns$__$",
                                "typeString": "function ()"
                              }
                            },
                            "id": 300,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2656:18:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 301,
                          "nodeType": "ExpressionStatement",
                          "src": "2656:18:1"
                        }
                      ]
                    },
                    "documentation": null,
                    "id": 303,
                    "implemented": true,
                    "kind": "function",
                    "modifiers": [],
                    "name": "buyCopyright",
                    "nodeType": "FunctionDefinition",
                    "parameters": {
                      "id": 218,
                      "nodeType": "ParameterList",
                      "parameters": [
                        {
                          "constant": false,
                          "id": 217,
                          "name": "_fingerprint",
                          "nodeType": "VariableDeclaration",
                          "scope": 303,
                          "src": "1839:26:1",
                          "stateVariable": false,
                          "storageLocation": "memory",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string"
                          },
                          "typeName": {
                            "id": 216,
                            "name": "string",
                            "nodeType": "ElementaryTypeName",
                            "src": "1839:6:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_storage_ptr",
                              "typeString": "string"
                            }
                          },
                          "value": null,
                          "visibility": "internal"
                        }
                      ],
                      "src": "1838:28:1"
                    },
                    "returnParameters": {
                      "id": 219,
                      "nodeType": "ParameterList",
                      "parameters": [],
                      "src": "1882:0:1"
                    },
                    "scope": 304,
                    "src": "1817:867:1",
                    "stateMutability": "payable",
                    "superFunction": null,
                    "visibility": "public"
                  }
                ],
                "scope": 305,
                "src": "58:2631:1"
              }
            ],
            "src": "33:2656:1"
          },
          "legacyAST": {
            "absolutePath": "/mnt/d/Documents/Studia/Blockchain/Projekt/inflation/contracts/idDatabase.sol",
            "exportedSymbols": {
              "idDatabase": [
                304
              ]
            },
            "id": 305,
            "nodeType": "SourceUnit",
            "nodes": [
              {
                "id": 58,
                "literals": [
                  "solidity",
                  "0.5",
                  ".16"
                ],
                "nodeType": "PragmaDirective",
                "src": "33:23:1"
              },
              {
                "baseContracts": [],
                "contractDependencies": [],
                "contractKind": "contract",
                "documentation": null,
                "fullyImplemented": true,
                "id": 304,
                "linearizedBaseContracts": [
                  304
                ],
                "name": "idDatabase",
                "nodeType": "ContractDefinition",
                "nodes": [
                  {
                    "canonicalName": "idDatabase.Account",
                    "id": 64,
                    "members": [
                      {
                        "constant": false,
                        "id": 61,
                        "name": "copyrights",
                        "nodeType": "VariableDeclaration",
                        "scope": 64,
                        "src": "141:22:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage_ptr",
                          "typeString": "struct idDatabase.Copyright[]"
                        },
                        "typeName": {
                          "baseType": {
                            "contractScope": null,
                            "id": 59,
                            "name": "Copyright",
                            "nodeType": "UserDefinedTypeName",
                            "referencedDeclaration": 77,
                            "src": "141:9:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                              "typeString": "struct idDatabase.Copyright"
                            }
                          },
                          "id": 60,
                          "length": null,
                          "nodeType": "ArrayTypeName",
                          "src": "141:11:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage_ptr",
                            "typeString": "struct idDatabase.Copyright[]"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 63,
                        "name": "index",
                        "nodeType": "VariableDeclaration",
                        "scope": 64,
                        "src": "174:10:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 62,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "174:4:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "name": "Account",
                    "nodeType": "StructDefinition",
                    "scope": 304,
                    "src": "86:174:1",
                    "visibility": "public"
                  },
                  {
                    "canonicalName": "idDatabase.Copyright",
                    "id": 77,
                    "members": [
                      {
                        "constant": false,
                        "id": 66,
                        "name": "fingerprint",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "296:18:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage_ptr",
                          "typeString": "string"
                        },
                        "typeName": {
                          "id": 65,
                          "name": "string",
                          "nodeType": "ElementaryTypeName",
                          "src": "296:6:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_storage_ptr",
                            "typeString": "string"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 68,
                        "name": "owner",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "325:21:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        "typeName": {
                          "id": 67,
                          "name": "address",
                          "nodeType": "ElementaryTypeName",
                          "src": "325:15:1",
                          "stateMutability": "payable",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 70,
                        "name": "isForSale",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "410:14:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "typeName": {
                          "id": 69,
                          "name": "bool",
                          "nodeType": "ElementaryTypeName",
                          "src": "410:4:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 72,
                        "name": "price",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "435:10:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 71,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "435:4:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 74,
                        "name": "sellingIndex",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "456:17:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 73,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "456:4:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 76,
                        "name": "exists",
                        "nodeType": "VariableDeclaration",
                        "scope": 77,
                        "src": "484:11:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "typeName": {
                          "id": 75,
                          "name": "bool",
                          "nodeType": "ElementaryTypeName",
                          "src": "484:4:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "name": "Copyright",
                    "nodeType": "StructDefinition",
                    "scope": 304,
                    "src": "268:235:1",
                    "visibility": "public"
                  },
                  {
                    "constant": false,
                    "id": 80,
                    "name": "userAddresses",
                    "nodeType": "VariableDeclaration",
                    "scope": 304,
                    "src": "511:23:1",
                    "stateVariable": true,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 78,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "511:7:1",
                        "stateMutability": "nonpayable",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "id": 79,
                      "length": null,
                      "nodeType": "ArrayTypeName",
                      "src": "511:9:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                        "typeString": "address[]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 84,
                    "name": "accounts",
                    "nodeType": "VariableDeclaration",
                    "scope": 304,
                    "src": "541:37:1",
                    "stateVariable": true,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_mapping$_t_address_$_t_struct$_Account_$64_storage_$",
                      "typeString": "mapping(address => struct idDatabase.Account)"
                    },
                    "typeName": {
                      "id": 83,
                      "keyType": {
                        "id": 81,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "550:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "nodeType": "Mapping",
                      "src": "541:28:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_struct$_Account_$64_storage_$",
                        "typeString": "mapping(address => struct idDatabase.Account)"
                      },
                      "valueType": {
                        "contractScope": null,
                        "id": 82,
                        "name": "Account",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 64,
                        "src": "561:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Account_$64_storage_ptr",
                          "typeString": "struct idDatabase.Account"
                        }
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 87,
                    "name": "fingerprints",
                    "nodeType": "VariableDeclaration",
                    "scope": 304,
                    "src": "587:21:1",
                    "stateVariable": true,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_string_storage_$dyn_storage",
                      "typeString": "string[]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 85,
                        "name": "string",
                        "nodeType": "ElementaryTypeName",
                        "src": "587:6:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage_ptr",
                          "typeString": "string"
                        }
                      },
                      "id": 86,
                      "length": null,
                      "nodeType": "ArrayTypeName",
                      "src": "587:8:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_string_storage_$dyn_storage_ptr",
                        "typeString": "string[]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 91,
                    "name": "copyrights",
                    "nodeType": "VariableDeclaration",
                    "scope": 304,
                    "src": "615:40:1",
                    "stateVariable": true,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                      "typeString": "mapping(string => struct idDatabase.Copyright)"
                    },
                    "typeName": {
                      "id": 90,
                      "keyType": {
                        "id": 88,
                        "name": "string",
                        "nodeType": "ElementaryTypeName",
                        "src": "624:6:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage_ptr",
                          "typeString": "string"
                        }
                      },
                      "nodeType": "Mapping",
                      "src": "615:29:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                        "typeString": "mapping(string => struct idDatabase.Copyright)"
                      },
                      "valueType": {
                        "contractScope": null,
                        "id": 89,
                        "name": "Copyright",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 77,
                        "src": "634:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                          "typeString": "struct idDatabase.Copyright"
                        }
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 94,
                    "name": "itemsForSale",
                    "nodeType": "VariableDeclaration",
                    "scope": 304,
                    "src": "664:24:1",
                    "stateVariable": true,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                      "typeString": "struct idDatabase.Copyright[]"
                    },
                    "typeName": {
                      "baseType": {
                        "contractScope": null,
                        "id": 92,
                        "name": "Copyright",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 77,
                        "src": "664:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                          "typeString": "struct idDatabase.Copyright"
                        }
                      },
                      "id": 93,
                      "length": null,
                      "nodeType": "ArrayTypeName",
                      "src": "664:11:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage_ptr",
                        "typeString": "struct idDatabase.Copyright[]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "body": {
                      "id": 148,
                      "nodeType": "Block",
                      "src": "759:383:1",
                      "statements": [
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "id": 105,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "baseExpression": {
                                      "argumentTypes": null,
                                      "id": 100,
                                      "name": "copyrights",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 91,
                                      "src": "778:10:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                                        "typeString": "mapping(string memory => struct idDatabase.Copyright storage ref)"
                                      }
                                    },
                                    "id": 102,
                                    "indexExpression": {
                                      "argumentTypes": null,
                                      "id": 101,
                                      "name": "_fingerprint",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 96,
                                      "src": "789:12:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_string_memory_ptr",
                                        "typeString": "string memory"
                                      }
                                    },
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "nodeType": "IndexAccess",
                                    "src": "778:24:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                      "typeString": "struct idDatabase.Copyright storage ref"
                                    }
                                  },
                                  "id": 103,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "exists",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 76,
                                  "src": "778:31:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "==",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "hexValue": "66616c7365",
                                  "id": 104,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "bool",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "813:5:1",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "value": "false"
                                },
                                "src": "778:40:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "46696e6765727072696e7420616c72656164792065786973747320696e2074686520646174616261736521",
                                "id": 106,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "820:45:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_7fd9ea80bd09883f37398d80dd46a7aaf9764825cdce52d825fb6c06d1402be1",
                                  "typeString": "literal_string \"Fingerprint already exists in the database!\""
                                },
                                "value": "Fingerprint already exists in the database!"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_7fd9ea80bd09883f37398d80dd46a7aaf9764825cdce52d825fb6c06d1402be1",
                                  "typeString": "literal_string \"Fingerprint already exists in the database!\""
                                }
                              ],
                              "id": 99,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "770:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 107,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "770:96:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 108,
                          "nodeType": "ExpressionStatement",
                          "src": "770:96:1"
                        },
                        {
                          "assignments": [
                            110
                          ],
                          "declarations": [
                            {
                              "constant": false,
                              "id": 110,
                              "name": "newCopyright",
                              "nodeType": "VariableDeclaration",
                              "scope": 148,
                              "src": "879:29:1",
                              "stateVariable": false,
                              "storageLocation": "memory",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Copyright_$77_memory_ptr",
                                "typeString": "struct idDatabase.Copyright"
                              },
                              "typeName": {
                                "contractScope": null,
                                "id": 109,
                                "name": "Copyright",
                                "nodeType": "UserDefinedTypeName",
                                "referencedDeclaration": 77,
                                "src": "879:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright"
                                }
                              },
                              "value": null,
                              "visibility": "internal"
                            }
                          ],
                          "id": 126,
                          "initialValue": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 112,
                                "name": "_fingerprint",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 96,
                                "src": "921:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 113,
                                  "name": "msg",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 838,
                                  "src": "935:3:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_message",
                                    "typeString": "msg"
                                  }
                                },
                                "id": 114,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "sender",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "935:10:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "66616c7365",
                                "id": 115,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "bool",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "947:5:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "value": "false"
                              },
                              {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 118,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "lValueRequested": false,
                                    "nodeType": "UnaryOperation",
                                    "operator": "-",
                                    "prefix": true,
                                    "src": "959:2:1",
                                    "subExpression": {
                                      "argumentTypes": null,
                                      "hexValue": "31",
                                      "id": 117,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "960:1:1",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_rational_minus_1_by_1",
                                      "typeString": "int_const -1"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_rational_minus_1_by_1",
                                      "typeString": "int_const -1"
                                    }
                                  ],
                                  "id": 116,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "nodeType": "ElementaryTypeNameExpression",
                                  "src": "954:4:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_uint256_$",
                                    "typeString": "type(uint256)"
                                  },
                                  "typeName": "uint"
                                },
                                "id": 119,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "954:8:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 122,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "lValueRequested": false,
                                    "nodeType": "UnaryOperation",
                                    "operator": "-",
                                    "prefix": true,
                                    "src": "969:2:1",
                                    "subExpression": {
                                      "argumentTypes": null,
                                      "hexValue": "31",
                                      "id": 121,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "970:1:1",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_rational_minus_1_by_1",
                                      "typeString": "int_const -1"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_rational_minus_1_by_1",
                                      "typeString": "int_const -1"
                                    }
                                  ],
                                  "id": 120,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "nodeType": "ElementaryTypeNameExpression",
                                  "src": "964:4:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_uint256_$",
                                    "typeString": "type(uint256)"
                                  },
                                  "typeName": "uint"
                                },
                                "id": 123,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "964:8:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "74727565",
                                "id": 124,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "bool",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "974:4:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "value": "true"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                },
                                {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "id": 111,
                              "name": "Copyright",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 77,
                              "src": "911:9:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_struct$_Copyright_$77_storage_ptr_$",
                                "typeString": "type(struct idDatabase.Copyright storage pointer)"
                              }
                            },
                            "id": 125,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "structConstructorCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "911:68:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_Copyright_$77_memory",
                              "typeString": "struct idDatabase.Copyright memory"
                            }
                          },
                          "nodeType": "VariableDeclarationStatement",
                          "src": "879:100:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 133,
                                "name": "newCopyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 110,
                                "src": "1027:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_memory_ptr",
                                  "typeString": "struct idDatabase.Copyright memory"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_struct$_Copyright_$77_memory_ptr",
                                  "typeString": "struct idDatabase.Copyright memory"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 127,
                                    "name": "accounts",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 84,
                                    "src": "990:8:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_mapping$_t_address_$_t_struct$_Account_$64_storage_$",
                                      "typeString": "mapping(address => struct idDatabase.Account storage ref)"
                                    }
                                  },
                                  "id": 130,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 128,
                                      "name": "msg",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 838,
                                      "src": "999:3:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_magic_message",
                                        "typeString": "msg"
                                      }
                                    },
                                    "id": 129,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "sender",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": null,
                                    "src": "999:10:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address_payable",
                                      "typeString": "address payable"
                                    }
                                  },
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "nodeType": "IndexAccess",
                                  "src": "990:20:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_Account_$64_storage",
                                    "typeString": "struct idDatabase.Account storage ref"
                                  }
                                },
                                "id": 131,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "copyrights",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 61,
                                "src": "990:31:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                  "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                }
                              },
                              "id": 132,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "push",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "990:36:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_arraypush_nonpayable$_t_struct$_Copyright_$77_storage_$returns$_t_uint256_$",
                                "typeString": "function (struct idDatabase.Copyright storage ref) returns (uint256)"
                              }
                            },
                            "id": 134,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "990:50:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 135,
                          "nodeType": "ExpressionStatement",
                          "src": "990:50:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "id": 140,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftHandSide": {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 136,
                                "name": "copyrights",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 91,
                                "src": "1053:10:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                                  "typeString": "mapping(string memory => struct idDatabase.Copyright storage ref)"
                                }
                              },
                              "id": 138,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 137,
                                "name": "_fingerprint",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 96,
                                "src": "1064:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "nodeType": "IndexAccess",
                              "src": "1053:24:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                "typeString": "struct idDatabase.Copyright storage ref"
                              }
                            },
                            "nodeType": "Assignment",
                            "operator": "=",
                            "rightHandSide": {
                              "argumentTypes": null,
                              "id": 139,
                              "name": "newCopyright",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 110,
                              "src": "1080:12:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Copyright_$77_memory_ptr",
                                "typeString": "struct idDatabase.Copyright memory"
                              }
                            },
                            "src": "1053:39:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_Copyright_$77_storage",
                              "typeString": "struct idDatabase.Copyright storage ref"
                            }
                          },
                          "id": 141,
                          "nodeType": "ExpressionStatement",
                          "src": "1053:39:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 145,
                                "name": "_fingerprint",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 96,
                                "src": "1121:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "id": 142,
                                "name": "fingerprints",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 87,
                                "src": "1103:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_string_storage_$dyn_storage",
                                  "typeString": "string storage ref[] storage ref"
                                }
                              },
                              "id": 144,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "push",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "1103:17:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_arraypush_nonpayable$_t_string_storage_$returns$_t_uint256_$",
                                "typeString": "function (string storage ref) returns (uint256)"
                              }
                            },
                            "id": 146,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1103:31:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 147,
                          "nodeType": "ExpressionStatement",
                          "src": "1103:31:1"
                        }
                      ]
                    },
                    "documentation": null,
                    "id": 149,
                    "implemented": true,
                    "kind": "function",
                    "modifiers": [],
                    "name": "addCopyright",
                    "nodeType": "FunctionDefinition",
                    "parameters": {
                      "id": 97,
                      "nodeType": "ParameterList",
                      "parameters": [
                        {
                          "constant": false,
                          "id": 96,
                          "name": "_fingerprint",
                          "nodeType": "VariableDeclaration",
                          "scope": 149,
                          "src": "724:26:1",
                          "stateVariable": false,
                          "storageLocation": "memory",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string"
                          },
                          "typeName": {
                            "id": 95,
                            "name": "string",
                            "nodeType": "ElementaryTypeName",
                            "src": "724:6:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_storage_ptr",
                              "typeString": "string"
                            }
                          },
                          "value": null,
                          "visibility": "internal"
                        }
                      ],
                      "src": "723:28:1"
                    },
                    "returnParameters": {
                      "id": 98,
                      "nodeType": "ParameterList",
                      "parameters": [],
                      "src": "759:0:1"
                    },
                    "scope": 304,
                    "src": "701:441:1",
                    "stateMutability": "nonpayable",
                    "superFunction": null,
                    "visibility": "public"
                  },
                  {
                    "body": {
                      "id": 214,
                      "nodeType": "Block",
                      "src": "1222:587:1",
                      "statements": [
                        {
                          "assignments": [
                            157
                          ],
                          "declarations": [
                            {
                              "constant": false,
                              "id": 157,
                              "name": "copyright",
                              "nodeType": "VariableDeclaration",
                              "scope": 214,
                              "src": "1233:27:1",
                              "stateVariable": false,
                              "storageLocation": "storage",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                "typeString": "struct idDatabase.Copyright"
                              },
                              "typeName": {
                                "contractScope": null,
                                "id": 156,
                                "name": "Copyright",
                                "nodeType": "UserDefinedTypeName",
                                "referencedDeclaration": 77,
                                "src": "1233:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright"
                                }
                              },
                              "value": null,
                              "visibility": "internal"
                            }
                          ],
                          "id": 161,
                          "initialValue": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 158,
                              "name": "copyrights",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 91,
                              "src": "1263:10:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                                "typeString": "mapping(string memory => struct idDatabase.Copyright storage ref)"
                              }
                            },
                            "id": 160,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 159,
                              "name": "_fingerprint",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 151,
                              "src": "1274:12:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_string_memory_ptr",
                                "typeString": "string memory"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "1263:24:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_Copyright_$77_storage",
                              "typeString": "struct idDatabase.Copyright storage ref"
                            }
                          },
                          "nodeType": "VariableDeclarationStatement",
                          "src": "1233:54:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "id": 166,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 163,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 157,
                                    "src": "1306:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 164,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "exists",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 76,
                                  "src": "1306:16:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "==",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "hexValue": "74727565",
                                  "id": 165,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "bool",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "1326:4:1",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "value": "true"
                                },
                                "src": "1306:24:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "5468657265206973206e6f207375636820636f70797269676874207361766564206f6e2074686520626c6f636b636861696e",
                                "id": 167,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "1332:52:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_94c9660b531fdc9346e211a06d927eecb0163871ff735f6517971ef722461af4",
                                  "typeString": "literal_string \"There is no such copyright saved on the blockchain\""
                                },
                                "value": "There is no such copyright saved on the blockchain"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_94c9660b531fdc9346e211a06d927eecb0163871ff735f6517971ef722461af4",
                                  "typeString": "literal_string \"There is no such copyright saved on the blockchain\""
                                }
                              ],
                              "id": 162,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "1298:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 168,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1298:87:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 169,
                          "nodeType": "ExpressionStatement",
                          "src": "1298:87:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                "id": 175,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 171,
                                    "name": "msg",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 838,
                                    "src": "1404:3:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_magic_message",
                                      "typeString": "msg"
                                    }
                                  },
                                  "id": 172,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "sender",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "1404:10:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address_payable",
                                    "typeString": "address payable"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "==",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 173,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 157,
                                    "src": "1418:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 174,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "owner",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 68,
                                  "src": "1418:15:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address_payable",
                                    "typeString": "address payable"
                                  }
                                },
                                "src": "1404:29:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "4f6e6c7920746865206f776e65722063616e2063616c6c20746869732066756e6374696f6e",
                                "id": 176,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "1435:39:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_02c4ea565ba5dd10ca7507fa4aece08fe60d2b6b945dff193cdbce1647b7face",
                                  "typeString": "literal_string \"Only the owner can call this function\""
                                },
                                "value": "Only the owner can call this function"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_02c4ea565ba5dd10ca7507fa4aece08fe60d2b6b945dff193cdbce1647b7face",
                                  "typeString": "literal_string \"Only the owner can call this function\""
                                }
                              ],
                              "id": 170,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "1396:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 177,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1396:79:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 178,
                          "nodeType": "ExpressionStatement",
                          "src": "1396:79:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "id": 183,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 180,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 157,
                                    "src": "1494:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 181,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "isForSale",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 70,
                                  "src": "1494:19:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "==",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "hexValue": "66616c7365",
                                  "id": 182,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "bool",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "1517:5:1",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "value": "false"
                                },
                                "src": "1494:28:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "5468697320636f7079726967687420697320616c726561647920666f722073616c65",
                                "id": 184,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "1533:36:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_2207a323d31b5123e695d54308c99f7ceda852c7ecf2bb7d0b3738fa7d4b7e2f",
                                  "typeString": "literal_string \"This copyright is already for sale\""
                                },
                                "value": "This copyright is already for sale"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_2207a323d31b5123e695d54308c99f7ceda852c7ecf2bb7d0b3738fa7d4b7e2f",
                                  "typeString": "literal_string \"This copyright is already for sale\""
                                }
                              ],
                              "id": 179,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "1486:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 185,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1486:84:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 186,
                          "nodeType": "ExpressionStatement",
                          "src": "1486:84:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "id": 191,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftHandSide": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 187,
                                "name": "copyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 157,
                                "src": "1583:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              },
                              "id": 189,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "memberName": "isForSale",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 70,
                              "src": "1583:19:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              }
                            },
                            "nodeType": "Assignment",
                            "operator": "=",
                            "rightHandSide": {
                              "argumentTypes": null,
                              "hexValue": "74727565",
                              "id": 190,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "bool",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1605:4:1",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              },
                              "value": "true"
                            },
                            "src": "1583:26:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            }
                          },
                          "id": 192,
                          "nodeType": "ExpressionStatement",
                          "src": "1583:26:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "id": 197,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftHandSide": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 193,
                                "name": "copyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 157,
                                "src": "1620:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              },
                              "id": 195,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "memberName": "price",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 72,
                              "src": "1620:15:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "nodeType": "Assignment",
                            "operator": "=",
                            "rightHandSide": {
                              "argumentTypes": null,
                              "id": 196,
                              "name": "_price",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 153,
                              "src": "1638:6:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "src": "1620:24:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 198,
                          "nodeType": "ExpressionStatement",
                          "src": "1620:24:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "id": 206,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftHandSide": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 199,
                                "name": "copyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 157,
                                "src": "1655:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              },
                              "id": 201,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "memberName": "sellingIndex",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 74,
                              "src": "1655:22:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "nodeType": "Assignment",
                            "operator": "=",
                            "rightHandSide": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "id": 205,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "leftExpression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 202,
                                  "name": "itemsForSale",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 94,
                                  "src": "1680:12:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                    "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                  }
                                },
                                "id": 203,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "length",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "1680:19:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "nodeType": "BinaryOperation",
                              "operator": "-",
                              "rightExpression": {
                                "argumentTypes": null,
                                "hexValue": "31",
                                "id": 204,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "number",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "1700:1:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_rational_1_by_1",
                                  "typeString": "int_const 1"
                                },
                                "value": "1"
                              },
                              "src": "1680:21:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "src": "1655:46:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 207,
                          "nodeType": "ExpressionStatement",
                          "src": "1655:46:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 211,
                                "name": "copyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 157,
                                "src": "1791:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "id": 208,
                                "name": "itemsForSale",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 94,
                                "src": "1773:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                  "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                }
                              },
                              "id": 210,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "push",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "1773:17:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_arraypush_nonpayable$_t_struct$_Copyright_$77_storage_$returns$_t_uint256_$",
                                "typeString": "function (struct idDatabase.Copyright storage ref) returns (uint256)"
                              }
                            },
                            "id": 212,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1773:28:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 213,
                          "nodeType": "ExpressionStatement",
                          "src": "1773:28:1"
                        }
                      ]
                    },
                    "documentation": null,
                    "id": 215,
                    "implemented": true,
                    "kind": "function",
                    "modifiers": [],
                    "name": "sellCopyright",
                    "nodeType": "FunctionDefinition",
                    "parameters": {
                      "id": 154,
                      "nodeType": "ParameterList",
                      "parameters": [
                        {
                          "constant": false,
                          "id": 151,
                          "name": "_fingerprint",
                          "nodeType": "VariableDeclaration",
                          "scope": 215,
                          "src": "1173:26:1",
                          "stateVariable": false,
                          "storageLocation": "memory",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string"
                          },
                          "typeName": {
                            "id": 150,
                            "name": "string",
                            "nodeType": "ElementaryTypeName",
                            "src": "1173:6:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_storage_ptr",
                              "typeString": "string"
                            }
                          },
                          "value": null,
                          "visibility": "internal"
                        },
                        {
                          "constant": false,
                          "id": 153,
                          "name": "_price",
                          "nodeType": "VariableDeclaration",
                          "scope": 215,
                          "src": "1201:11:1",
                          "stateVariable": false,
                          "storageLocation": "default",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "typeName": {
                            "id": 152,
                            "name": "uint",
                            "nodeType": "ElementaryTypeName",
                            "src": "1201:4:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "value": null,
                          "visibility": "internal"
                        }
                      ],
                      "src": "1172:41:1"
                    },
                    "returnParameters": {
                      "id": 155,
                      "nodeType": "ParameterList",
                      "parameters": [],
                      "src": "1222:0:1"
                    },
                    "scope": 304,
                    "src": "1150:659:1",
                    "stateMutability": "nonpayable",
                    "superFunction": null,
                    "visibility": "private"
                  },
                  {
                    "body": {
                      "id": 302,
                      "nodeType": "Block",
                      "src": "1882:802:1",
                      "statements": [
                        {
                          "assignments": [
                            221
                          ],
                          "declarations": [
                            {
                              "constant": false,
                              "id": 221,
                              "name": "copyright",
                              "nodeType": "VariableDeclaration",
                              "scope": 302,
                              "src": "1893:27:1",
                              "stateVariable": false,
                              "storageLocation": "storage",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                "typeString": "struct idDatabase.Copyright"
                              },
                              "typeName": {
                                "contractScope": null,
                                "id": 220,
                                "name": "Copyright",
                                "nodeType": "UserDefinedTypeName",
                                "referencedDeclaration": 77,
                                "src": "1893:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright"
                                }
                              },
                              "value": null,
                              "visibility": "internal"
                            }
                          ],
                          "id": 225,
                          "initialValue": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 222,
                              "name": "copyrights",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 91,
                              "src": "1923:10:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                                "typeString": "mapping(string memory => struct idDatabase.Copyright storage ref)"
                              }
                            },
                            "id": 224,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 223,
                              "name": "_fingerprint",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 217,
                              "src": "1934:12:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_string_memory_ptr",
                                "typeString": "string memory"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "1923:24:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_Copyright_$77_storage",
                              "typeString": "struct idDatabase.Copyright storage ref"
                            }
                          },
                          "nodeType": "VariableDeclarationStatement",
                          "src": "1893:54:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                "id": 237,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "commonType": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "id": 230,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "leftExpression": {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 227,
                                      "name": "copyright",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 221,
                                      "src": "1966:9:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                        "typeString": "struct idDatabase.Copyright storage pointer"
                                      }
                                    },
                                    "id": 228,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "exists",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 76,
                                    "src": "1966:16:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_bool",
                                      "typeString": "bool"
                                    }
                                  },
                                  "nodeType": "BinaryOperation",
                                  "operator": "==",
                                  "rightExpression": {
                                    "argumentTypes": null,
                                    "hexValue": "74727565",
                                    "id": 229,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "kind": "bool",
                                    "lValueRequested": false,
                                    "nodeType": "Literal",
                                    "src": "1986:4:1",
                                    "subdenomination": null,
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_bool",
                                      "typeString": "bool"
                                    },
                                    "value": "true"
                                  },
                                  "src": "1966:24:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "&&",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "commonType": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "id": 236,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "leftExpression": {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "baseExpression": {
                                        "argumentTypes": null,
                                        "id": 231,
                                        "name": "copyrights",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 91,
                                        "src": "1994:10:1",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_mapping$_t_string_memory_$_t_struct$_Copyright_$77_storage_$",
                                          "typeString": "mapping(string memory => struct idDatabase.Copyright storage ref)"
                                        }
                                      },
                                      "id": 233,
                                      "indexExpression": {
                                        "argumentTypes": null,
                                        "id": 232,
                                        "name": "_fingerprint",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 217,
                                        "src": "2005:12:1",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_string_memory_ptr",
                                          "typeString": "string memory"
                                        }
                                      },
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "nodeType": "IndexAccess",
                                      "src": "1994:24:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                        "typeString": "struct idDatabase.Copyright storage ref"
                                      }
                                    },
                                    "id": 234,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "isForSale",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 70,
                                    "src": "1994:34:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_bool",
                                      "typeString": "bool"
                                    }
                                  },
                                  "nodeType": "BinaryOperation",
                                  "operator": "==",
                                  "rightExpression": {
                                    "argumentTypes": null,
                                    "hexValue": "74727565",
                                    "id": 235,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "kind": "bool",
                                    "lValueRequested": false,
                                    "nodeType": "Literal",
                                    "src": "2032:4:1",
                                    "subdenomination": null,
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_bool",
                                      "typeString": "bool"
                                    },
                                    "value": "true"
                                  },
                                  "src": "1994:42:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  }
                                },
                                "src": "1966:70:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "4973206e6f7420666f722073616c6521",
                                "id": 238,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "2047:18:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_945d981991fe8f9d0ed645cce8eba653dea3e3be67c6aec7f2d5b228dea1d929",
                                  "typeString": "literal_string \"Is not for sale!\""
                                },
                                "value": "Is not for sale!"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_945d981991fe8f9d0ed645cce8eba653dea3e3be67c6aec7f2d5b228dea1d929",
                                  "typeString": "literal_string \"Is not for sale!\""
                                }
                              ],
                              "id": 226,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "1958:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 239,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1958:108:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 240,
                          "nodeType": "ExpressionStatement",
                          "src": "1958:108:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                "id": 246,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 242,
                                    "name": "msg",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 838,
                                    "src": "2085:3:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_magic_message",
                                      "typeString": "msg"
                                    }
                                  },
                                  "id": 243,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "sender",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "2085:10:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address_payable",
                                    "typeString": "address payable"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": "!=",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 244,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 221,
                                    "src": "2099:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 245,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "owner",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 68,
                                  "src": "2099:15:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address_payable",
                                    "typeString": "address payable"
                                  }
                                },
                                "src": "2085:29:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "546865206f776e65722063616e206e6f7420626520746865206275796572",
                                "id": 247,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "2116:32:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_98d6e6fd29f00b413c0aad920b9aed5b3dc246fbd9e33c8d1735fc4b79957383",
                                  "typeString": "literal_string \"The owner can not be the buyer\""
                                },
                                "value": "The owner can not be the buyer"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_98d6e6fd29f00b413c0aad920b9aed5b3dc246fbd9e33c8d1735fc4b79957383",
                                  "typeString": "literal_string \"The owner can not be the buyer\""
                                }
                              ],
                              "id": 241,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "2077:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 248,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2077:72:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 249,
                          "nodeType": "ExpressionStatement",
                          "src": "2077:72:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "commonType": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                "id": 255,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 251,
                                    "name": "msg",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 838,
                                    "src": "2168:3:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_magic_message",
                                      "typeString": "msg"
                                    }
                                  },
                                  "id": 252,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "value",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "2168:9:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "nodeType": "BinaryOperation",
                                "operator": ">=",
                                "rightExpression": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 253,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 221,
                                    "src": "2181:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 254,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "price",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 72,
                                  "src": "2181:15:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "src": "2168:28:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              {
                                "argumentTypes": null,
                                "hexValue": "5468652066756e647320617265206e6f742073756666696369656e74",
                                "id": 256,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "string",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "2198:30:1",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_stringliteral_556ad67d0b08ddb22809fde7f292cd50dee9e45cd0f4b26ffb971e0d8489a6e8",
                                  "typeString": "literal_string \"The funds are not sufficient\""
                                },
                                "value": "The funds are not sufficient"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_556ad67d0b08ddb22809fde7f292cd50dee9e45cd0f4b26ffb971e0d8489a6e8",
                                  "typeString": "literal_string \"The funds are not sufficient\""
                                }
                              ],
                              "id": 250,
                              "name": "require",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [
                                841,
                                842
                              ],
                              "referencedDeclaration": 842,
                              "src": "2160:7:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                "typeString": "function (bool,string memory) pure"
                              }
                            },
                            "id": 257,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2160:69:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 258,
                          "nodeType": "ExpressionStatement",
                          "src": "2160:69:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 264,
                                  "name": "msg",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 838,
                                  "src": "2267:3:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_message",
                                    "typeString": "msg"
                                  }
                                },
                                "id": 265,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "value",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "2267:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 259,
                                  "name": "copyright",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 221,
                                  "src": "2242:9:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                    "typeString": "struct idDatabase.Copyright storage pointer"
                                  }
                                },
                                "id": 262,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "owner",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 68,
                                "src": "2242:15:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                }
                              },
                              "id": 263,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "transfer",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "2242:24:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
                                "typeString": "function (uint256)"
                              }
                            },
                            "id": 266,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2242:35:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 267,
                          "nodeType": "ExpressionStatement",
                          "src": "2242:35:1"
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "id": 273,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftHandSide": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 268,
                                "name": "copyright",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 221,
                                "src": "2288:9:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                  "typeString": "struct idDatabase.Copyright storage pointer"
                                }
                              },
                              "id": 270,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "memberName": "owner",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 68,
                              "src": "2288:15:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            "nodeType": "Assignment",
                            "operator": "=",
                            "rightHandSide": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 271,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 838,
                                "src": "2306:3:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 272,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "sender",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "2306:10:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            "src": "2288:28:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            }
                          },
                          "id": 274,
                          "nodeType": "ExpressionStatement",
                          "src": "2288:28:1"
                        },
                        {
                          "condition": {
                            "argumentTypes": null,
                            "commonType": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "id": 278,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "leftExpression": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 275,
                                "name": "itemsForSale",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 94,
                                "src": "2491:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                  "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                }
                              },
                              "id": 276,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "length",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "2491:19:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "nodeType": "BinaryOperation",
                            "operator": ">",
                            "rightExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 277,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2511:1:1",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "src": "2491:21:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            }
                          },
                          "falseBody": null,
                          "id": 296,
                          "nodeType": "IfStatement",
                          "src": "2488:158:1",
                          "trueBody": {
                            "id": 295,
                            "nodeType": "Block",
                            "src": "2513:133:1",
                            "statements": [
                              {
                                "assignments": [
                                  280
                                ],
                                "declarations": [
                                  {
                                    "constant": false,
                                    "id": 280,
                                    "name": "index",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 295,
                                    "src": "2529:10:1",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "typeName": {
                                      "id": 279,
                                      "name": "uint",
                                      "nodeType": "ElementaryTypeName",
                                      "src": "2529:4:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                      }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                  }
                                ],
                                "id": 283,
                                "initialValue": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 281,
                                    "name": "copyright",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 221,
                                    "src": "2542:9:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage_ptr",
                                      "typeString": "struct idDatabase.Copyright storage pointer"
                                    }
                                  },
                                  "id": 282,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "sellingIndex",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 74,
                                  "src": "2542:22:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "nodeType": "VariableDeclarationStatement",
                                "src": "2529:35:1"
                              },
                              {
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 293,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "leftHandSide": {
                                    "argumentTypes": null,
                                    "baseExpression": {
                                      "argumentTypes": null,
                                      "id": 284,
                                      "name": "itemsForSale",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 94,
                                      "src": "2579:12:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                        "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                      }
                                    },
                                    "id": 286,
                                    "indexExpression": {
                                      "argumentTypes": null,
                                      "id": 285,
                                      "name": "index",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 280,
                                      "src": "2592:5:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                      }
                                    },
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": true,
                                    "nodeType": "IndexAccess",
                                    "src": "2579:19:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                      "typeString": "struct idDatabase.Copyright storage ref"
                                    }
                                  },
                                  "nodeType": "Assignment",
                                  "operator": "=",
                                  "rightHandSide": {
                                    "argumentTypes": null,
                                    "baseExpression": {
                                      "argumentTypes": null,
                                      "id": 287,
                                      "name": "itemsForSale",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 94,
                                      "src": "2599:12:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                        "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                      }
                                    },
                                    "id": 292,
                                    "indexExpression": {
                                      "argumentTypes": null,
                                      "commonType": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                      },
                                      "id": 291,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "leftExpression": {
                                        "argumentTypes": null,
                                        "expression": {
                                          "argumentTypes": null,
                                          "id": 288,
                                          "name": "itemsForSale",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 94,
                                          "src": "2612:12:1",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                            "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                          }
                                        },
                                        "id": 289,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "length",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": null,
                                        "src": "2612:19:1",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_uint256",
                                          "typeString": "uint256"
                                        }
                                      },
                                      "nodeType": "BinaryOperation",
                                      "operator": "-",
                                      "rightExpression": {
                                        "argumentTypes": null,
                                        "hexValue": "31",
                                        "id": 290,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": true,
                                        "kind": "number",
                                        "lValueRequested": false,
                                        "nodeType": "Literal",
                                        "src": "2632:1:1",
                                        "subdenomination": null,
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_rational_1_by_1",
                                          "typeString": "int_const 1"
                                        },
                                        "value": "1"
                                      },
                                      "src": "2612:21:1",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                      }
                                    },
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "nodeType": "IndexAccess",
                                    "src": "2599:35:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                      "typeString": "struct idDatabase.Copyright storage ref"
                                    }
                                  },
                                  "src": "2579:55:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_Copyright_$77_storage",
                                    "typeString": "struct idDatabase.Copyright storage ref"
                                  }
                                },
                                "id": 294,
                                "nodeType": "ExpressionStatement",
                                "src": "2579:55:1"
                              }
                            ]
                          }
                        },
                        {
                          "expression": {
                            "argumentTypes": null,
                            "arguments": [],
                            "expression": {
                              "argumentTypes": [],
                              "expression": {
                                "argumentTypes": null,
                                "id": 297,
                                "name": "itemsForSale",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 94,
                                "src": "2656:12:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_struct$_Copyright_$77_storage_$dyn_storage",
                                  "typeString": "struct idDatabase.Copyright storage ref[] storage ref"
                                }
                              },
                              "id": 299,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "pop",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "2656:16:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_arraypop_nonpayable$__$returns$__$",
                                "typeString": "function ()"
                              }
                            },
                            "id": 300,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2656:18:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_tuple$__$",
                              "typeString": "tuple()"
                            }
                          },
                          "id": 301,
                          "nodeType": "ExpressionStatement",
                          "src": "2656:18:1"
                        }
                      ]
                    },
                    "documentation": null,
                    "id": 303,
                    "implemented": true,
                    "kind": "function",
                    "modifiers": [],
                    "name": "buyCopyright",
                    "nodeType": "FunctionDefinition",
                    "parameters": {
                      "id": 218,
                      "nodeType": "ParameterList",
                      "parameters": [
                        {
                          "constant": false,
                          "id": 217,
                          "name": "_fingerprint",
                          "nodeType": "VariableDeclaration",
                          "scope": 303,
                          "src": "1839:26:1",
                          "stateVariable": false,
                          "storageLocation": "memory",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string"
                          },
                          "typeName": {
                            "id": 216,
                            "name": "string",
                            "nodeType": "ElementaryTypeName",
                            "src": "1839:6:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_storage_ptr",
                              "typeString": "string"
                            }
                          },
                          "value": null,
                          "visibility": "internal"
                        }
                      ],
                      "src": "1838:28:1"
                    },
                    "returnParameters": {
                      "id": 219,
                      "nodeType": "ParameterList",
                      "parameters": [],
                      "src": "1882:0:1"
                    },
                    "scope": 304,
                    "src": "1817:867:1",
                    "stateMutability": "payable",
                    "superFunction": null,
                    "visibility": "public"
                  }
                ],
                "scope": 305,
                "src": "58:2631:1"
              }
            ],
            "src": "33:2656:1"
          },
          "compiler": {
            "name": "solc",
            "version": "0.5.16+commit.9c3226ce.Emscripten.clang"
          },
          "networks": {
            "5777": {
              "events": {},
              "links": {},
              "address": "0x2Cf0DB0A674db2ABC35518e2E9edc87234c4F883",
              "transactionHash": "0x552cfbe5465945af4b681dd1a9593854748fdcca2ee3650ff42e3ce916672e4e"
            }
          },
          "schemaVersion": "3.2.1",
          "updatedAt": "2020-07-03T16:30:32.153Z",
          "networkType": "ethereum",
          "devdoc": {
            "methods": {}
          },
          "userdoc": {
            "methods": {}
          }
        };
        this.contracts.ipDatabase = TruffleContract(ipDatabaseArtifact);
  
        // Set the provider for our contract
        this.contracts.ipDatabase.setProvider(this.web3Provider);
  
        // Use our contract to retrieve and mark the adopted pets
        // return App.markAdopted();
    },
  },
  template: '<App />'
})
