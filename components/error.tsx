import {motion} from 'framer-motion'
const Error = () => {
  return (
    <motion.div
              key="generated"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg" role="alert">
              <h2 className="font-bold text-lg">Error:</h2>
              <p className="mt-1 text-sm">There was an issue generating your social bio. Please try again.</p>
            
            </motion.div>
  )
}

export default Error
