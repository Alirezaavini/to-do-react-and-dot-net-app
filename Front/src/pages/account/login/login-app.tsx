import * as Yup from 'yup';
import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
    BackspaceIcon,
    BackwardIcon,
    LanguageIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { T } from '../../../components/basic/text';
import i18next, { TProvider } from '../../../i18n';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/button';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRef } from 'react';
import SelectLanguage from '../../../components/basic/select-language';
import BasicCard from '../../../components/ui/card';
import BlurBackground from '../../../components/ui/blur-background';
import CustomTextInput from '../../../components/basic/custom-input';
import { useLayoutDirection } from '../../../app/LayoutDirectionContext';
import { useDispatch } from 'react-redux';
import { userInfoActions } from '../../../app/stores/user-info-slice';

export default function LoginApp() {
    const formRef = useRef<any>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickLogin = () => {
        formRef.current.validateForm().then(() => {
            if (formRef.current.isValid) {
                var values = formRef.current.values;
                console.log(values);
                dispatch(userInfoActions.init({ name: values.name, username: values.username }));
                navigate('/dashboard');
            }
        });
    };

    const changeLanguage = () => {
        i18next.changeLanguage('en');
        i18next.dir('en');
    };

    return (
        <TProvider>
            <div className=" h-dvh flex justify-center px-1 md:px-5 dark:bg-gray-900 relative isolate ">
                <BlurBackground />
                <div className="mt-2 flex flex-col align-middle max-h-max w-full max-w-[500px] md:max-h-[600] ">
                    <LoginTopSection />
                    <BasicCard
                        title={
                            <>
                                <UserIcon className="h-6 w-6 stroke-2" /> <T className="text-2xl font-bold">login</T>
                            </>
                        }
                        classNames="">
                        <LoginForm formRef={formRef} />

                        <div className="px-3 mt-8">
                            <div className="flex flex-row gap-2 items-centermb-3">
                                <Button color="primary" onClick={() => onClickLogin()} size="sm" variant="contained" title="Login" />
                                <Button
                                    color="info"
                                    onClick={() => {
                                        changeLanguage();
                                    }}
                                    size="sm"
                                    variant="outline"
                                    title="Reset Password"
                                />
                            </div>
                            <div className="my-3">
                                <span className="text-sm text-stone-400 ">If you dont have account, register</span>
                            </div>
                        </div>
                    </BasicCard>
                </div>
            </div>
        </TProvider>
    );
}

const LoginForm = ({ formRef }: any) => (
    <>
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
                name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
                password: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
            })}
            innerRef={formRef}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSubmitting(false);
                }, 400);
            }}>
            {(formik) => (
                <Form>
                    <div className="mt-3 mx-3 pb-3 flex flex-col">
                        {/* <span className=" text-gray-500">Username:</span> */}
                        <CustomTextInput label={<T>name</T>} name="name" type="text" />
                        {/* <Field
                            name="username"
                            type="text"
                            className="mt-2 shoadow border border-slate-200 text-sm rounded w-full py-2 px-3 text-gray-700 leading-flight"
                        />
                        <ErrorMessage name="username" /> */}
                    </div>
                    <div className="mt-3 mx-2 pb-3 flex flex-col">
                        {/* <span className="text-gray-500">Password:</span>
                        <Field
                            name="password"
                            type="password"
                            className="mt-2 shoadow border border-slate-200 text-sm w-full py-2 px-3 text-gray-700 leading-flight rounded-md"
                        />
                        <ErrorMessage name="password" /> */}
                        <CustomTextInput label={<T>password</T>} name="password" type="password" />
                    </div>
                </Form>
            )}
        </Formik>
    </>
);

const LoginTopSection = () => {
    const navigate = useNavigate();
    const { isRtl } = useLayoutDirection();

    return (
        <div className="flex flex-row gap-2 mb-2 text-gray-500 dark:text-gray-200 cursor-pointer align-middle justify-between">
            <div className="flex flex-row gap-2 align-middle items-center" onClick={() => navigate('/')}>
                {isRtl ? (
                    <>
                        <ArrowRightCircleIcon className="h-6 w-6 md:h-5 md:w-5 stroke-2 " /> <T>Back</T>
                    </>
                ) : (
                    <>
                        <ArrowLeftCircleIcon className="h-6 w-6 md:h-5 md:w-5 stroke-2 " /> <T>Back</T>
                    </>
                )}
            </div>
            <SelectLanguage />
        </div>
    );
};
