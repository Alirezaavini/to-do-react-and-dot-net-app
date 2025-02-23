import * as Yup from 'yup';
import { ArrowLeftCircleIcon, BackspaceIcon, BackwardIcon, UserIcon } from '@heroicons/react/24/outline';
import { T } from '../../../components/basic/text';
import { TProvider } from '../../../i18n';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/button';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export default function LoginApp() {
    const navigate = useNavigate();
    return (
        <TProvider>
            <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className=" h-dvh flex justify-center px-1 md:px-5 ">
                <div className="mt-20 flex flex-col align-middle max-h-max w-full max-w-[500px]  md:max-h-[600]">
                    <div className="flex flex-row gap-2 mb-2 text-gray-500 cursor-pointer align-middle" onClick={() => navigate('/')}>
                        <ArrowLeftCircleIcon className="h-6 w-6 md:h-5 md:w-5 stroke-2 mt-0.5" /> <span>Back</span>
                    </div>
                    <div className=" bg-white border border-stone-200 rounded-2xl">
                        <div className="p-2 border-b border-stone-200 text-black rounded-t-xl flex gap-2 align-middle items-center">
                            <UserIcon className="h-6 w-6 stroke-2" /> <T className="text-2xl font-bold">Login</T>
                        </div>

                        <LoginForm />

                        <div className="px-3 mt-8">
                            <div className="flex flex-row gap-2 items-centermb-3">
                                <Button color="primary" onClick={() => {}} size="sm" variant="outline" title="Login" />
                                <Button color="info" onClick={() => {}} size="sm" variant="outline" title="Reset Password" />
                            </div>
                            <div className="my-3">
                                <span className="text-sm text-stone-400 ">If you dont have account, register</span>
                            </div>
                        </div>
                        <div
                            aria-hidden="true"
                            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                            <div
                                style={{
                                    clipPath:
                                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </TProvider>
    );
}

const LoginForm = () => (
    <>
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
                username: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
                password: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                debugger;
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}>
            {(formik) => (
                <Form>
                    <div className="mt-3 mx-3 pb-3 flex flex-col">
                        <span className=" text-gray-500">Username:</span>
                        <Field
                            name="username"
                            type="text"
                            className="mt-2 shoadow border border-slate-200 text-sm rounded w-full py-2 px-3 text-gray-700 leading-flight"
                        />
                        <ErrorMessage name="username" />
                    </div>
                    <div className="mt-3 mx-2 pb-3 flex flex-col">
                        <span className="text-gray-500">Password:</span>
                        <Field
                            name="password"
                            type="password"
                            className="mt-2 shoadow border border-slate-200 text-sm w-full py-2 px-3 text-gray-700 leading-flight rounded-md"
                        />
                        <ErrorMessage name="password" />
                    </div>
                </Form>
            )}
        </Formik>
    </>
);
