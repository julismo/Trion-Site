'use client'
import { useState } from 'react'
import { usePageInit } from '@/lib/usePageInit'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ParaQuemSection from '@/components/sections/ParaQuemSection'
import SolucoesSection from '@/components/sections/SolucoesSection'
import MetodologiaSection from '@/components/sections/MetodologiaSection'
import DiferencialSection from '@/components/sections/DiferencialSection'
import SegurancaSection from '@/components/sections/SegurancaSection'
import SobreSection from '@/components/sections/SobreSection'
import CtaSection from '@/components/sections/CtaSection'
import ContactModal from '@/components/ui/ContactModal'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function Home() {
  usePageInit()
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }
  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <Header onOpenModal={openModal} />
      <main>
        <HeroSection onOpenModal={openModal} />
        <ParaQuemSection />
        <SolucoesSection />
        <MetodologiaSection />
        <DiferencialSection />
        <SegurancaSection />
        <SobreSection onOpenModal={openModal} />
        <CtaSection onOpenModal={openModal} />
      </main>
      <Footer onOpenModal={openModal} />
      <ContactModal isOpen={modalOpen} onClose={closeModal} />
      <ScrollToTop />
    </>
  )
}
