const Buffer = require('buffer/').Buffer
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import Button from '../elements/Button'
import { useRouter } from 'next/router'
import { Sicher } from '@axelity/sicher.js'

import { useCustomerNumStore } from '../store/numberStore'
import SignaturePlaceholder from '../components/SignaturePlaceholder'
import Resizer from '../components/Resizer'
import Bolla from '../components/Bolla'
import SignaturePad from '../components/SignaturePad'
import SmoothPad from '../components/Wrapper'
import Wrapper from '../components/Wrapper'

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
      <Wrapper />
      {/* <SmoothPad height={100} width={300} /> */}
      <div style={{ width: '400px', height: '400px' }} className="relative bg-gray-100">
        {/* <SignaturePlaceholder height={50} width={180} left={50} top={50} /> */}
        {/* <Resizer size={20} left={50} top={50} />
        <Resizer size={20} left={150} top={50} /> */}
        {/* <Resizer size={20} left={50} top={150} />
        <Resizer size={20} left={150} top={150} /> */}
        {/* <Bolla left={50} top={50} />
        <Bolla left={150} top={50} /> */}
      </div>
    </div>
  )
}
