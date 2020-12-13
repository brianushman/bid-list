using BidListWebApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BidListWebApi.Controllers
{
  [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
  public class AuthenticationController : ApiController
  {
    private string filename = ConfigurationManager.AppSettings["UserAuthFilename"];

    public HttpResponseMessage Get(string user, string password)
    {
      if (string.IsNullOrEmpty(filename)) throw new Exception("Config value: UserAuthFilename does not exist.");
      
      var userModel = JsonConvert.DeserializeObject<UserModel>(File.ReadAllText(filename));
      return !userModel.user.Equals(user, StringComparison.OrdinalIgnoreCase) || !userModel.password.Equals(password) ?
        Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Invalid Login Attempt.") :
        Request.CreateResponse(HttpStatusCode.OK);
    }
  }
}
