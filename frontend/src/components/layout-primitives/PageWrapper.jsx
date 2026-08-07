import { motion } from 'framer-motion'
import SEO from '@/components/shell/SEO'
import { pageTransition } from '@/lib/motion'
import { cn } from '@/utils/cn'

export function PageWrapper({ children, title, description, className }) {
  return (
    <>
      <SEO title={title} description={description} />
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransition}
        className={cn('w-full min-h-[calc(100vh-5rem)] pb-12', className)}
      >
        {children}
      </motion.div>
    </>
  )
}

export default PageWrapper
