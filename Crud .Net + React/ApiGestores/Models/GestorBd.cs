using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiGestores.Models
{
    public class GestorBd
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int Lanzamiento { get; set; }
        public string Desarrollador { get; set; }

    }
}
