using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BidListWebApi.Models
{
  public class BidModel
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime DateDue { get; set; }
    public string Estimator { get; set; }
    public bool IsDuct { get; set; }
    public bool IsPipe { get; set; }
    public UInt32 Addendums { get; set; }
    public bool IsDeleted { get; set; }
  }
}
