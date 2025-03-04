import { toast } from 'react-toastify';

export const notify = {
    error: (title: any, message: any = null, props: any = null) => {
        if (title instanceof Error) {
            var ex = title;
            title = ex.message;
        } else if (title === 'object' && title.response) {
            const ex = title;
            title = ex.response.data;
            message = ex.toString();
        }
        if (!message) toast.error(<div>{title}</div>);
        else
            toast.error(
                () => (
                    <>
                        <h5>{title}</h5>
                        <small>{message}</small>
                    </>
                ),
                props
            );
    },

    success: (title: any, message: any = null, props: any = null) => {
        if (!message) toast.success(<div>{title}</div>);
        else
            toast.success(
                () => (
                    <>
                        <h5>{title}</h5>
                        <small>{message}</small>
                    </>
                ),
                props
            );
    },

    info: (title: any, message: any = null, props: any = null) => {
        if (!message) toast.info(<div>{title}</div>, { position: 'bottom-center', ...props });
        else
            toast.info(
                () => (
                    <>
                        <h5>{title}</h5>
                        <small>{message}</small>
                    </>
                ),
                { position: 'bottom-center', ...props }
            );
    },

    warning: (title: any, message: any = null, props: any = null) => {
        if (!message) toast.warning(<div>{title}</div>);
        else
            toast.warning(
                () => (
                    <>
                        <h5>{title}</h5>
                        <small>{message}</small>
                    </>
                ),
                props
            );
    },

    dark: (title: any, message: any = null, props: any = null) => {
        if (!message) toast.dark(<div>{title}</div>, { position: 'bottom-center', ...props });
        else
            toast.dark(
                () => (
                    <>
                        <h5>{title}</h5>
                        <small>{message}</small>
                    </>
                ),
                { position: 'bottom-center', ...props }
            );
    },

    close: (id: any) => toast.dismiss(id),
};
