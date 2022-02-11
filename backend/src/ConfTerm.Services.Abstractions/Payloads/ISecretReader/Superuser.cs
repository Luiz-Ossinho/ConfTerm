using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfTerm.Services.Abstractions.Payloads.ISecretReader
{
    public record Superuser(string Name, string Email, string Password);
}
