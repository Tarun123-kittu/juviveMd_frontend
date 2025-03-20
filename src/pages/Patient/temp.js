// In patientData componnent--

//   useEffect(() => {
//     return () => {
//       setCanEditPatientPlan(false); 
//       dispatch(clear_is_patient_plan_editable())
//     };
//   }, []);















// useEffect(() => {
//     if (suggested_plans?.isSuccess && !editable) {
//       const staticDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//       const updatedDays = staticDays.reduce((acc, day) => {
//         const dayExercises = suggested_plans?.data?.data?.days?.[day] || [];

//         acc[day] = dayExercises.length
//           ? dayExercises.map((exercise) => ({
//             category: exercise.exercise_type || "",
//             patient_category: exercise?.patient_category || "A",
//             training_type: exercise.training_type || [],
//             exerciseId: exercise.id || "",
//             planExerciseId: exercise.planExerciseId,
//             exerciseName: exercise.exercise_name || "Untitled",
//             exerciseImage: exercise.image_url || "",
//             exerciseVideo: exercise.video_link || "",
//             difficuilty_level: patient_selected_category ? difficuilty_level_data[patient_selected_category] : "",
//             active: true,
//             bodyParts: [],
//             sets: exercise.categories?.length
//               ? exercise.categories.map((categoryItem) => ({
//                 category:categoryItem.category,
//                 sets:categoryItem.start_point?.sets,
//                 reps: categoryItem.start_point?.reps || 0,
//                 time: { value: categoryItem.start_point?.time || 0, unit: "sec" },
//                 weight: { value: categoryItem.start_point?.weight || 0, unit: "kg" },
//               }))
//               : [
//                 {
//                   reps: 0,
//                   time: { value: 0, unit: "sec" },
//                   weight: { value: 0, unit: "kg" },
//                 },
//               ],
//           }))
//           : [daysData];

//         return acc;
//       }, {});
//       setDays(updatedDays);

//       const firstExercise = suggested_plans?.data?.data?.days?.Monday?.[0];
//       if (firstExercise) {
//         setSelected_patient_category(firstExercise.patient_category || "A");
//         setSelected_training_type(firstExercise.training_type || []);
//       }
//     }
//   }, [suggested_plans, editable]);








// removed!editable from if (cond'n)
// useEffect(() => {
//     if (suggested_plans?.isSuccess) {
//         const staticDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//         const updatedDays = staticDays.reduce((acc, day) => {
//             const dayExercises = suggested_plans?.data?.data?.days?.[day] || [];

//             acc[day] = dayExercises.length
//                 ? dayExercises.map((exercise) => ({
//                     category: exercise.exercise_type || "",
//                     patient_category: exercise?.patient_category || "A",
//                     training_type: exercise.training_type || [],
//                     exerciseId: exercise.id || "",
//                     planExerciseId: exercise.planExerciseId,
//                     exerciseName: exercise.exercise_name || "Untitled",
//                     exerciseImage: exercise.image_url || "",
//                     exerciseVideo: exercise.video_link || "",
//                     difficuilty_level: patient_selected_category ? difficuilty_level_data[patient_selected_category] : "",
//                     active: true,
//                     bodyParts: [],
//                     sets: exercise.categories?.length
//                         ? exercise.categories.map((categoryItem) => ({
//                             category: categoryItem.category,
//                             sets: categoryItem.start_point?.sets,
//                             reps: categoryItem.start_point?.reps || 0,
//                             time: { value: categoryItem.start_point?.time || 0, unit: "sec" },
//                             weight: { value: categoryItem.start_point?.weight || 0, unit: "kg" },
//                         }))
//                         : [
//                             {
//                                 reps: 0,
//                                 time: { value: 0, unit: "sec" },
//                                 weight: { value: 0, unit: "kg" },
//                             },
//                         ],
//                 }))
//                 : [daysData];

//             return acc;
//         }, {});
//         setDays(updatedDays);

//         const firstExercise = suggested_plans?.data?.data?.days?.Monday?.[0];
//         if (firstExercise) {
//             setSelected_patient_category(firstExercise.patient_category || "A");
//             setSelected_training_type(firstExercise.training_type || []);
//         }
//     }
// }, [suggested_plans, editable]);



















// const handleSavePlan = () => {
//     try {
//         const validatedPlan = Object.keys(days).reduce((acc, day) => {

//             const validExercises = days[day]
//                 .map((exercise) => {
//                     console.log("ex--", exercise)
//                     return {
//                         exerciseId: exercise.exerciseId,
//                         planExerciseId: exercise.planExerciseId,
//                         difficulty_level: exercise.difficuilty_level,
//                         sets: exercise.sets.map((set) => ({
//                             category: set.category,
//                             sets: set.sets,
//                             time: {
//                                 value: set.time.value,
//                                 unit: set.time.unit,
//                             },
//                             weight: {
//                                 value: set.weight.value,
//                                 unit: set.weight.unit,
//                             },
//                             reps: set.reps,
//                         })),
//                     }
//                 })
//                 .filter(exercise => exercise.exerciseId);
//             console.log("validExercises--", validExercises)
//             if (validExercises.length > 0) {
//                 acc[day] = validExercises;
//             }

//             return acc;
//         }, {});














