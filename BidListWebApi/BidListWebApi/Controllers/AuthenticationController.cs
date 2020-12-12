using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BidListWebApi.Controllers
{
  [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
  public class AuthenticationController : ApiController
  {
    public HttpResponseMessage Get(string user, string password)
    {
      return Request.CreateResponse(HttpStatusCode.OK);
    }
  }
}
