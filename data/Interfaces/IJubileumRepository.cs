using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IJubileumRepository
    {
        JubileumEntity AddRegistration(string firstName, string lastName, int adults, int children);
    }
}
