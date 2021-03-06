const Buffer = require('buffer/').Buffer
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import Button from '../elements/Button'
import { useRouter } from 'next/router'
import { Sicher } from '@axelity/sicher.js'

import { useCustomerNumStore } from '../store/numberStore'
import SmoothPad from '../components/SmoothPad'
import ResizableDiv from '../components/ResizableDiv'

export default function Home() {
  let { t } = useTranslation()

  const router = useRouter()

  const { addCustomer, numCustomers, resetCustomers } = useCustomerNumStore()

  const [primaryColor, setPrimaryColor] = useState<string>('#000000')
  const [secondaryColor, setSecondaryColor] = useState<string>('#000000')

  const [privateKey, setPrivateKey] = useState<string>('')
  const [publicKey, setPublicKey] = useState<string>('')
  const [sharedSecret, setSharedSecret] = useState<string>('')
  const [encapsulatedSecret, setEncapsulatedSecret] = useState<string>('')
  const [decryptedSecret, setDecryptedSecret] = useState<string>('')

  const handleAdd = () => {
    addCustomer(1)
  }

  const handleReset = () => {
    resetCustomers()
  }

  const handleView = () => {
    router.push('/dashboard')
  }

  const handleSicher = () => {
    const sicher = new Sicher()

    const { privateKey: priKey, publicKey: pubKey } = sicher.generateKeypair()

    setPrivateKey(Buffer.from(priKey).toString('base64'))
    setPublicKey(Buffer.from(pubKey).toString('base64'))

    const { encapsulatedKey: c, sharedSecret: ss } = sicher.encrypt(pubKey)
    setSharedSecret(Buffer.from(ss).toString('base64'))
    setEncapsulatedSecret(Buffer.from(c).toString('base64'))

    const decSec = sicher.decrypt(c, priKey)
    setDecryptedSecret(Buffer.from(decSec).toString('base64'))
  }

  useEffect(() => {
    let root = document.documentElement
    root.style.setProperty('--primary', primaryColor)
    root.style.setProperty('--secondary', secondaryColor)
  }, [primaryColor, secondaryColor])

  useEffect(() => {
    setPrimaryColor('#1060aa')
    setSecondaryColor('#e2d6c7')
  }, [])

  return (
    <div>
      <SmoothPad />
      <ResizableDiv left={100} top={100} width={720} height={240} minHeight={80} minWidth={240}>
        <h1 className="text-2xl text-acb-primary">{t('common:greeting')}</h1>
        <h2 className="text-xl text-acb-secondary">{t('about:title')}</h2>
        <h3 className="text-md">
          {t('about:introduction', {
            name: 'Thomas',
            age: 51,
          })}
        </h3>
        <Button label={t('common:action.add')} onClick={handleAdd}></Button>
        <Button label={t('common:action.reset')} onClick={handleReset}></Button>
        <Button label={t('common:action.view')} onClick={handleView}></Button>
        <Button label={'Sicher'} onClick={handleSicher}></Button>
        <p className="text-6xl">{numCustomers.num}</p>
        <p className="text-base font-bold">Private Key</p>
        <p className="text-base">{privateKey}</p>
        <p className="text-base font-bold">Public Key</p>
        <p className="text-base">{publicKey}</p>
        <p className="text-base font-bold">Encapsulated Secret</p>
        <p className="text-base">{encapsulatedSecret}</p>
        <p className="text-base font-bold">Shared Secret</p>
        <p className="text-base">{sharedSecret}</p>
        <p className="text-base font-bold">Decrypted secret</p>
        <p className="text-base">{decryptedSecret}</p>
      </ResizableDiv>
      {/* <ResizableDiv left={100} top={100} />
      <ResizableDiv left={300} top={300} /> */}
    </div>
  )
}
