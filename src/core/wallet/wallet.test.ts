import { randomBytes } from 'crypto'
import elliptic from 'elliptic'
import { SHA256 } from 'crypto-js'

const ec = new elliptic.ec('secp256k1')
// 저 알고리즘의 결과를 리턴해주는 라이브러리가 있지 않을까?
// elliptic

describe('지갑 이해하기', () => {
    let privKey: string
    let pubKey: string
    let signature: elliptic.ec.Signature
    // 사람한테 보여줄때
    it('비밀 키 (private Key)', () => {
        privKey = randomBytes(32).toString('hex') // 개인키
        console.log(privKey.length)
    })
    // 컴퓨터한테 알려줄때
    it('공개키 생성하기', () => {
        const keyPair = ec.keyFromPrivate(privKey)
        // pubKey = keyPair.getPublic().encode('hex', true)
        pubKey = keyPair.getPublic().encode('hex', true)
        console.log(pubKey)
    })
    // 서명
    it('디지털 서명', () => {
        // 서명을 만들때 필요한 값
        // 개인키, 해쉬값
        const keyPair = ec.keyFromPrivate(privKey)
        const hash = SHA256('ingoo').toString()
        console.log(keyPair)
        signature = keyPair.sign(hash, 'hex')
        // signature(서명) 만 가지고 복호화는 못 한다.
        // 서명 + public Key 를 활용하면 가능하다. // boolean
        console.log(signature)
    })
    // 서명한거 검증
    it('검증 (verify)', () => {
        // 서명, hash, 공개키
        const hash = SHA256('ingoo').toString()
        const verify = ec.verify(hash, signature, ec.keyFromPublic(pubKey, 'hex')) // boolean
        console.log(verify)

        // 트랙젝션
    })
    // 이더리움은 앞에 글자를 짤라서 한다.
    it('계정 만들기', () => {
        const buffer = Buffer.from(pubKey)
        const address = buffer.slice(24).toString()
        console.log(address.length)
    })
})
