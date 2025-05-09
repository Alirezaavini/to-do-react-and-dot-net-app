using Microsoft.AspNetCore.Mvc.ModelBinding;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TodoApp.Common
{
    public class Response
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorCode { get; set; }
        public Dictionary<string, string> ErrorParams { get; set; }

        public object Result { get; set; }


        public Response()
        {
            IsSuccess = true;
            Result = null;
        }

        public Response(Exception ex)
        {
            IsSuccess = false;
            ErrorMessage = ex.Message;
        }

        public Response(object result)
        {
            IsSuccess = true;
            ErrorMessage = null;
            ErrorCode = null;
            Result = result;
        }

        public Response(string errorMessage, string errorCode = null, Dictionary<string, string> errorParams = null)
        {
            IsSuccess = false;
            ErrorMessage = errorMessage;
            ErrorCode = errorCode;
            ErrorParams = errorParams;
        }

        public Response(ModelStateDictionary modelState)
        {
            var errors = new List<string>();
            foreach (var model in modelState)
            {
                errors.AddRange(model.Value.Errors.Select(x => x.ErrorMessage));
            }
            IsSuccess = false;
            ErrorMessage = string.Join("\r\n", errors);
            ErrorCode = "405";
        }

        public static Response Error403()
        {
            return new Response("403", "403");
        }
    }


    public class Response<T> where T : class
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorCode { get; set; }
        public T Result { get; set; }


        public Response()
        {
            IsSuccess = true;
        }

        public Response(string errorMessage, string errorCode = null)
        {
            IsSuccess = false;
            Result = default;
            ErrorMessage = errorMessage;
            ErrorCode = errorCode;
        }

        public Response(bool isSuccess, T result = default, string errorMessage = "")
        {
            IsSuccess = isSuccess;
            Result = result;
            ErrorMessage = errorMessage;
        }

        public Response(Exception ex)
        {
            IsSuccess = false;
            ErrorMessage = ex.Message;
        }

        public Response(T result)
        {
            IsSuccess = true;
            Result = result;
            ErrorMessage = null;
        }

        public static Response<T> Error403()
        {
            return new Response<T>("403", "403");
        }
    }
}

