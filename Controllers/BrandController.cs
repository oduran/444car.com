using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _444Car.Interface;
using _444Car.InternalModels;
using _444Car.Models;
using _444Car.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace _444Car.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly IBrandRepository brandRep;

        public BrandController(IBrandRepository brandRep)
        {
            this.brandRep = brandRep;
        }



        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetAllBrands()
        {
            try
            {
                var result = await brandRep.GetAllBrands();
                if (result == null)
                    return NotFound();

                return Ok(new { result = result });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievering data from database " + ex.ToString());
            }


        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetAllBrandsRentCar()
        {
            try
            {
                var result = await brandRep.GetAllBrands();
                if (result == null)
                    return NotFound();

                ResponseBrandDto newResult = new ResponseBrandDto();
                List<ResponseBrandDto> list = new List<ResponseBrandDto>(){
    new ResponseBrandDto { id = 0, brandName = "IT DOES NOT MATTER" }
};
                List<string> newlist = new List<string>() { new string("IT DOES NOT MATTER") };
                for (int i = 0; i < result.Count; i++)
                {
                   

                    newResult.id = i+1;
                    newResult.brandName = result[i];

                    list.Add(newResult);
                    newlist.Add(newResult.brandName);
                }
                
                return Ok(new { result = newlist });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievering data from database " + ex.ToString());
            }


        }

        [AllowAnonymous]
        [HttpGet("{brandId}")]
        public async Task<ActionResult> GetBrandById(long brandId)
        {
            try
            {
                var result = await brandRep.GetBrandById(brandId);
                if (result == null)
                    return NotFound();

                return Ok(new { result = result });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievering data from database " + ex.ToString());
            }
        }

        [AllowAnonymous]
        [HttpGet("{brandName}")]
        public async Task<ActionResult> GetBrandByName(string brandName)
        {
            try
            {
                var result = await brandRep.GetBrandByName(brandName);
                if (result == null)
                    return NotFound();

                return Ok(new { result = result });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievering data from database " + ex.ToString());
            }
        }


        [AllowAnonymous]
        [HttpGet("{brandName}")]
        public async Task<ActionResult> GetRegistiretionMonth(string brandName)
        {
            try
            {
                var result = await brandRep.GetRegistiretionMonth(brandName);
                if (result == null)
                    return NotFound();

                return Ok(new { result = result });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievering data from database " + ex.ToString());
            }
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> GetDiffrentRentCars([FromBody] DiffrentRentCarBrandsDto brandsObj)
        {
            try
            {
                if (brandsObj.brandName != null && brandsObj.serial != null && brandsObj.bodyType != null)
                {
                    var brandResult = await brandRep.GetDiffrentRentCarFuelType(brandsObj.brandName, brandsObj.serial, brandsObj.bodyType);

                    if (brandResult == null)
                        return NotFound();

                    return Ok(new { result = brandResult });
                }

                if (brandsObj.brandName != null && brandsObj.serial != null)
                {
                    var brandResult = await brandRep.GetDiffrentRentCarBodyType(brandsObj.brandName, brandsObj.serial);

                    if (brandResult == null)
                        return NotFound();

                    return Ok(new { result = brandResult });
                }

                if (brandsObj.brandName != null)
                {
                    var brandResult = await brandRep.GetDiffrentRentCarSerial(brandsObj.brandName);

                    if (brandResult == null)
                        return NotFound();

                    return Ok(new { result = brandResult });
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievering data from database " + ex.ToString());
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> GetBrands([FromBody] BrandsDto brandsObj)
        {
            try
            {
                if (brandsObj.brandName != null && brandsObj.registrationMonth != null && brandsObj.registrationYear != 0 && brandsObj.model != null
                    && brandsObj.fuelType != null && brandsObj.ps != null && brandsObj.modelType != null && brandsObj.bodyType != null && brandsObj.productionPeriod != null 
                    && brandsObj.numberOfDors != null && brandsObj.gear != null && brandsObj.engineCapacity != null && brandsObj.emission != null)
                {
                    var brandResult = await brandRep.GetBrandId(brandsObj.brandName, brandsObj.registrationMonth, brandsObj.registrationYear, brandsObj.model,
                        brandsObj.fuelType, brandsObj.ps, brandsObj.modelType, brandsObj.bodyType, brandsObj.productionPeriod, brandsObj.numberOfDors, brandsObj.gear,
                        brandsObj.engineCapacity, brandsObj.emission);

                    if (brandResult == null)
                        return NotFound();

                    return Ok(new { result = brandResult });
                }

                if (brandsObj.brandName != null && brandsObj.registrationMonth != null && brandsObj.registrationYear != 0 && brandsObj.model != null 
                    && brandsObj.fuelType != null && brandsObj.ps != null && brandsObj.modelType != null && brandsObj.bodyType != null && brandsObj.productionPeriod != null && brandsObj.numberOfDors != null && brandsObj.gear != null && brandsObj.engineCapacity != null)
                {
                    List<string> emission = await brandRep.GetEmission(brandsObj.brandName, brandsObj.registrationMonth, brandsObj.registrationYear, brandsObj.model,
                        brandsObj.fuelType, brandsObj.ps, brandsObj.modelType, brandsObj.bodyType, brandsObj.productionPeriod, brandsObj.numberOfDors, brandsObj.gear,
                        brandsObj.engineCapacity);
                    
                    if (emission == null)
                        return NotFound();

                    return Ok(new { result = emission });
                }

                if (brandsObj.brandName != null && brandsObj.registrationMonth != null && brandsObj.registrationYear != 0 && brandsObj.model != null
                    && brandsObj.fuelType != null && brandsObj.ps != null && brandsObj.modelType != null && brandsObj.bodyType != null && brandsObj.productionPeriod != null && brandsObj.numberOfDors != null && brandsObj.gear != null )
                {
                    List<string> engineCapacity = await brandRep.GetEgineCapacity(brandsObj.brandName, brandsObj.registrationMonth, brandsObj.registrationYear, brandsObj.model,
                        brandsObj.fuelType, brandsObj.ps, brandsObj.modelType, brandsObj.bodyType, brandsObj.productionPeriod, brandsObj.numberOfDors, brandsObj.gear);

                    if (engineCapacity == null)
                        return NotFound();

                    return Ok(new { result = engineCapacity });
                }

                if (brandsObj.brandName != null && brandsObj.registrationMonth != null && brandsObj.registrationYear != 0 && brandsObj.model != null
                    && brandsObj.fuelType != null && brandsObj.ps != null && brandsObj.modelType != null && brandsObj.bodyType != null && brandsObj.productionPeriod != null && brandsObj.numberOfDors != null)
                {
                    List<string> gear = await brandRep.GetGear(brandsObj.brandName, brandsObj.registrationMonth, brandsObj.registrationYear, brandsObj.model,
                        brandsObj.fuelType, brandsObj.ps, brandsObj.modelType, brandsObj.bodyType, brandsObj.productionPeriod, brandsObj.numberOfDors);

                    if (gear == null)
                        return NotFound();

                    return Ok(new { result = gear });
                }

                if (brandsObj.brandName != null && brandsObj.registrationMonth != null && brandsObj.registrationYear != 0 && brandsObj.model != null
                    && brandsObj.fuelType != null && brandsObj.ps != null && brandsObj.modelType != null && brandsObj.bodyType != null && brandsObj.productionPeriod != null )
                {
                    List<string> numberOfDors = await brandRep.GetNumberOfDors(brandsObj.brandName, brandsObj.registrationMonth, brandsObj.registrationYear, brandsObj.model,
                        brandsObj.fuelType, brandsObj.ps, brandsObj.modelType, brandsObj.bodyType, brandsObj.productionPeriod);

                    if (numberOfDors == null)
                        return NotFound();

                    return Ok(new { result = numberOfDors });
                }

                if (brandsObj.brandName != null && brandsObj.registrationMonth != null && brandsObj.registrationYear != 0 && brandsObj.model != null
                    && brandsObj.fuelType != null && brandsObj.ps != null && brandsObj.modelType != null && brandsObj.bodyType != null)
                {
                    List<string> productionPeriod = await brandRep.GetProductionPeriod(brandsObj.brandName, brandsObj.registrationMonth, brandsObj.registrationYear, brandsObj.model,
                        brandsObj.fuelType, brandsObj.ps, brandsObj.modelType, brandsObj.bodyType);

                    if (productionPeriod == null)
                        return NotFound();

                    return Ok(new { result = productionPeriod });
                }

                if (brandsObj.brandName != null && brandsObj.registrationMonth != null && brandsObj.registrationYear != 0 && brandsObj.model != null
                    && brandsObj.fuelType != null && brandsObj.ps != null && brandsObj.modelType != null)
                {
                    List<string> bodyType = await brandRep.GetVehicleBodyType(brandsObj.brandName, brandsObj.registrationMonth, brandsObj.registrationYear, brandsObj.model,
                        brandsObj.fuelType, brandsObj.ps, brandsObj.modelType);

                    if (bodyType == null)
                        return NotFound();

                    return Ok(new { result = bodyType });
                }

                if (brandsObj.brandName != null && brandsObj.registrationMonth != null && brandsObj.registrationYear != 0 && brandsObj.model != null
                    && brandsObj.fuelType != null && brandsObj.ps != null)
                {
                    List<string> modelType = await brandRep.GetVehicleModelType(brandsObj.brandName, brandsObj.registrationMonth, brandsObj.registrationYear, brandsObj.model,
                        brandsObj.fuelType, brandsObj.ps);

                    if (modelType == null)
                        return NotFound();

                    return Ok(new { result = modelType });
                }

                if (brandsObj.brandName != null && brandsObj.registrationMonth != null && brandsObj.registrationYear != 0 && brandsObj.model != null
                    && brandsObj.fuelType != null)
                {
                    List<string> _ps = await brandRep.GetPs(brandsObj.brandName, brandsObj.registrationMonth, brandsObj.registrationYear, brandsObj.model,
                        brandsObj.fuelType);

                    if (_ps == null)
                        return NotFound();

                    return Ok(new { result = _ps });
                }

                if (brandsObj.brandName != null && brandsObj.registrationMonth != null && brandsObj.registrationYear != 0 && brandsObj.model != null)
                {
                    List<string> fuelType = await brandRep.GetFuelType(brandsObj.brandName, brandsObj.registrationMonth, brandsObj.registrationYear, brandsObj.model);

                    if (fuelType == null)
                        return NotFound();

                    return Ok(new { result = fuelType });
                }

                if (brandsObj.brandName != null && brandsObj.registrationMonth != null && brandsObj.registrationYear != 0)
                {
                    List<string> models = await brandRep.GetModels(brandsObj.brandName, brandsObj.registrationMonth, brandsObj.registrationYear);

                    if (models == null)
                        return NotFound();

                    return Ok(new { result = models });
                }

                if (brandsObj.brandName != null && brandsObj.registrationMonth != null)
                {
                    List<int> registrationYear = await brandRep.GetRegistiretionYear(brandsObj.brandName, brandsObj.registrationMonth);

                    if (registrationYear == null)
                        return NotFound();

                    return Ok(new { result = registrationYear });
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievering data from database " + ex.ToString());
            }
        }




        /*Aşağıdakiler olmayacak*/
        //[AllowAnonymous]
        //[HttpPost]
        //public async Task<ActionResult<t_Brands>> AddBrand(t_Brands brandObj)
        //{
        //    var result = await brandRep.AddBrand(brandObj);
        //    return Ok();
        //}


        //[HttpPost]
        //public async Task<ActionResult> UpdateBrandById(t_Brands brandObj)
        //{
        //    try
        //    {

        //        t_Brands result = await brandRep.UpdateBrandById(brandObj);
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, "UpdateFaq Error retrievering data from database " + ex.ToString());
        //    }
        //}

    }
}
