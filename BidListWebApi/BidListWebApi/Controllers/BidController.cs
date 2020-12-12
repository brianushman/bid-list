using BidListWebApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BidListWebApi.Controllers
{
  [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
  public class BidController : ApiController
  {
    private string filename = ConfigurationManager.AppSettings["JsonDataFilename"];

    public HttpResponseMessage Get()
    {
      return Request.CreateResponse(HttpStatusCode.OK, GetAllBids());
    }

    public HttpResponseMessage Post([FromBody] BidModel value)
    {
      try
      {
        var bids = GetAllBids().ToList();

        value.IsDeleted = false;
        value.Id = bids.Any() ? bids.Max(x => x.Id) + 1 : 0;
        bids.Add(value);
        WriteAllBids(bids.ToArray());
        return Request.CreateResponse(HttpStatusCode.OK);
      }
      catch(Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
      }

    }

    public HttpResponseMessage Delete(int id)
    {
      try
      {
        var bids = GetAllBids().ToList();
        bids.Where(x => x.Id == id).ToList().ForEach(x => x.IsDeleted = true);
        WriteAllBids(bids.ToArray());
        return Request.CreateResponse(HttpStatusCode.OK);
      }
      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
      }
    }

    private BidModel[] GetAllBids()
    {
      lock (filename)
      {
        if (string.IsNullOrEmpty(filename)) throw new Exception("Config value: JsonDataFilename does not exist.");
        if (!File.Exists(filename)) File.WriteAllText(filename, "[]");
        return JsonConvert.DeserializeObject<BidModel[]>(File.ReadAllText(filename));
      }
    }

    private void WriteAllBids(BidModel[] bids)
    {
      lock (filename)
      {
        if (string.IsNullOrEmpty(filename)) throw new Exception("Config value: JsonDataFilename does not exist.");
        File.WriteAllText(filename, JsonConvert.SerializeObject(bids));
      }
    }
  }
}
