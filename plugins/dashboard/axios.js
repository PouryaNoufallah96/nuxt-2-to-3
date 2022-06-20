import { handleErrorNotification } from "@/util/handleResponses";
export default function(
  { app, store, $axios, error, route, redirect },
  inject
) {
  $axios.onError(async apiError => {
    try {
      if (apiError.response.status === 401)
        return await store.dispatch("logoutFromServer");
      if (apiError.response.status === 403)
        return error({
          statusCode: 403,
          message: "عدم دسترسی"
        });

      if (process.client)
        return handleErrorNotification(apiError.response.data.message);
      console.log(apiError.response.data.message);
      return error({
        statusCode: 400,
        message: apiError.response.data.message,
        redirect: route.fullPath
      });
    } catch (error) {
      if (process.client)
        return handleErrorNotification(
          "ارتباط با سرور برقرار نیست. لطفا مجددا تلاش کنید"
        );
    }
  });
}
