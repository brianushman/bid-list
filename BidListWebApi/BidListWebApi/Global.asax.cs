using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace BidListWebApi
{
  public class WebApiApplication : System.Web.HttpApplication
  {
    protected void Application_Start()
    {
      GlobalConfiguration.Configure(WebApiConfig.Register);
      GlobalConfiguration.Configuration.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
    }

    protected void Application_BeginRequest()
    {
      if (Request.Headers.AllKeys.Contains(CorsHandler.Origin) && Request.HttpMethod == "OPTIONS")
      {
        Response.StatusCode = (int)HttpStatusCode.OK;
        Response.Headers.Add(CorsHandler.AccessControlAllowCredentials, "true");
        Response.Headers.Add(CorsHandler.AccessControlAllowOrigin, Request.Headers.GetValues(CorsHandler.Origin).First());
        string accessControlRequestMethod = Request.Headers.GetValues(CorsHandler.AccessControlRequestMethod).FirstOrDefault();
        if (accessControlRequestMethod != null)
        {
          Response.Headers.Add(CorsHandler.AccessControlAllowMethods, accessControlRequestMethod);
        }

        var hdrs = new List<string>(Request.Headers.GetValues(CorsHandler.AccessControlRequestHeaders) ?? new string[0]);
        hdrs.Add("X-Auth-Token");
        string requestedHeaders = string.Join(", ", hdrs.ToArray());
        Response.Headers.Add(CorsHandler.AccessControlAllowHeaders, requestedHeaders);
        Response.Headers.Add("Access-Control-Expose-Headers", "X-Auth-Token");
        Response.Flush();
      }
    }
  }

  public class CorsHandler : DelegatingHandler
  {
    public const string Origin = "Origin";
    public const string AccessControlRequestMethod = "Access-Control-Request-Method";
    public const string AccessControlRequestHeaders = "Access-Control-Request-Headers";
    public const string AccessControlAllowOrigin = "Access-Control-Allow-Origin";
    public const string AccessControlAllowMethods = "Access-Control-Allow-Methods";
    public const string AccessControlAllowHeaders = "Access-Control-Allow-Headers";
    public const string AccessControlAllowCredentials = "Access-Control-Allow-Credentials";

    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
      bool isPreflightRequest = request.Method == HttpMethod.Options;
      bool isCorsRequest = request.Headers.Contains(Origin);
      if (isCorsRequest)
      {
        if (isPreflightRequest)
        {
          return Task.Factory.StartNew<HttpResponseMessage>(() =>
          {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Headers.Add(AccessControlAllowOrigin, request.Headers.GetValues(Origin).First());

            string accessControlRequestMethod = request.Headers.GetValues(AccessControlRequestMethod).FirstOrDefault();
            if (accessControlRequestMethod != null)
            {
              response.Headers.Add(AccessControlAllowMethods, accessControlRequestMethod);
            }

            string requestedHeaders = string.Join(", ", request.Headers.GetValues(AccessControlRequestHeaders));
            if (!string.IsNullOrEmpty(requestedHeaders))
            {
              response.Headers.Add(AccessControlAllowHeaders, requestedHeaders);
            }

            return response;
          }, cancellationToken);
        }
        else
        {
          return base.SendAsync(request, cancellationToken).ContinueWith<HttpResponseMessage>(t =>
          {
            HttpResponseMessage resp = t.Result;
            resp.Headers.Add(AccessControlAllowOrigin, request.Headers.GetValues(Origin).First());
            return resp;
          });
        }
      }
      else
      {
        return base.SendAsync(request, cancellationToken);
      }
    }
  }
}
