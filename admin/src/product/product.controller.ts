import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { createProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productServices: ProductService) { }

    //---------------------------------
    //------Get All Products-----------
    //---------------------------------
    @Get()
    async allProducts(): Promise<Product[]> {
        return this.productServices.all()
    }

    @Post()
    async createProduct(
        @Body() createProductInput: createProductDto
    ): Promise<Product> {
        return this.productServices.create(createProductInput)
    }

    @Get(':id')
    async getProduct(@Param('id') id: number): Promise<Product> {
        return this.productServices.get(id)
    }


    @Patch(':id')
    async updateProduct(
        @Param('id') id: number,
        @Body() updateProductUnput: updateProductDto
    ): Promise<Product> {
        return this.productServices.update(id, updateProductUnput)
    }

    @Delete(":id")
    async deleteProduct(@Param('id') id: number){
        return this.productServices.deleteOne(id)
    }
}
