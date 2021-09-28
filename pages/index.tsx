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
      <ResizableDiv left={100} top={100} />
      <ResizableDiv left={300} top={300} />
    </div>
  )
}
