import { PageNotFoundState } from "./Error";
import Layout from "./Layout";

const NotFound = () => {
  return (
      <Layout>
      <PageNotFoundState />
      </Layout>
  );
};

export default NotFound;
//                 <Link to="/contact">
//                   <span>Contact Support</span>
//                   <ArrowRight className="h-4 w-4" />
//                 </Link>
//               </Button>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7, duration: 0.5 }}
//             className="pt-12"
//           >
//             <p className="text-sm text-slate-500 dark:text-slate-500">
//               NBFC ONBOARDING
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotFound;