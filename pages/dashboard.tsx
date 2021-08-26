import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import Button from '../elements/Button'
import { useRouter } from 'next/router'

import { useCustomerNumStore } from '../store/numberStore'

export default function Dashboard() {
  let { t } = useTranslation()

  const router = useRouter()

  const { numCustomers } = useCustomerNumStore()  

  const handleBack = () => {
    router.back()
  }

  return (
    <div>
      <Button label={t('common:action.back')} onClick={handleBack}></Button>
      <p className="text-6xl">{numCustomers.num}</p>
    </div>
  )
}
