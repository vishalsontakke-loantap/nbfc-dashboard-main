import { PageNotFoundState } from "./Error";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <PageNotFoundState />
    </div>
  );
};

export default NotFound;

//               <Button asChild variant="outline" size="lg" className="gap-2">
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