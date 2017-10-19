/**
 * Created by jin on 9/18/17.
 */

const env = process.env.NODE_ENV || 'test'


//Require the dev-dependencies
const expect = require('chai').expect
const should = require('chai').should()
const supertest = require('supertest')

const server = supertest.agent('https://member-chenlu.yimei180.com')
const server2 = supertest.agent('https://www-chenlu.yimei180.com')


/*

 describe('First test', () => {
 it('Should assert true to be true', () => {
 expect(true).to.be.true;
 });
 });
 */


describe('用户注册登陆', function () {

     var cookies = ['']

    it('登陆成功 POST: /login', function (done) {
        server.post('/login')
            .set('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                username: "18221136691",
                password: "12345678"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                if (err) return done(err)
                expect(res.body.success, 'success属性值应该是true 但实际不是true').to.equal(true)
                // cookies = res.headers['set-cookie']
                cookies[0] = ['passport=' + res.body.passport]
                done()

            })
    })

    it('登陆失败 POST: /login', function (done) {
        server.post('/login')
            .set('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                username: "18221136691",
                password: "a13644607354"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                if (err) return done(err)
                expect(res.body.success, 'success属性值应该是false 但实际不是false').to.equal(false)
                expect(res.body.error, 'error属性应该是用户名密码错误，但实际不是').to.equal('用户名密码错误')

                done()
            })
    })

    it('修改账户信息 POST: /account/saveUserProfile', function (done) {
        server.post('/account/saveUserProfile')
            .set('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            // .set('Cookie', cookies)
            .send({
                nickname:114555,
                telephone: '',
                qq: ''
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                // console.log(err)
                // console.log('--------------------------')
                // console.log(res.body)
                if (err) return done(err)
                expect(res.body.status, 'status属性值应该是true 但实际不是true').to.equal(true)
                done()
            })
    })

    it('发布需求 成功 POST: /sell/checkDemand', function (done) {
        server2.post('/sell/checkDemand')
            .set('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Cookie', cookies)
            .send(
                {
                    "coaltype": "动力煤",
                    "demandamount": "313",
                    "quoteenddate": "2017-10-18 15:39:42",
                    "inspectionagency": "无",
                    "otherorg": "",
                    "deliverymode": "港口平仓",
                    "paymode": "现汇",
                    "transportmode": "不限",
                    "deliveryprovince": "16",
                    "deliveryplace": "佛山港",
                    "otherplace": "",
                    "deliverydatestart": "",
                    "deliverydateend": "",
                    "deliverydate": "2017-10-22",
                    "NCV": "3",
                    "NCV02": "4",
                    "TM": "3",
                    "TM02": "4",
                    "ADV": "3",
                    "ADV02": "4",
                    "RS": "3",
                    "RS02": "4",
                    "RV": "",
                    "RV02": "",
                    "IM": "",
                    "IM02": "",
                    "FC": "",
                    "FC02": "",
                    "AFT": "",
                    "HGI": "",
                    "ADS": "",
                    "ADS02": "",
                    "ASH": "",
                    "ASH02": "",
                    "GV": "",
                    "GV02": "",
                    "YV": "",
                    "YV02": "",
                    "PS": "0",
                    "releasecomment": ""
                }
            )
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err)
                expect(res.body.success, 'success 属性值应该是true 但实际不是true').to.equal(true)
                done()
            })
    })

    it('发布需求 非法输入 POST: /sell/checkDemand', function (done) {

        server2.post('/sell/checkDemand')
            .set('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Cookie', cookies)
            .send(
                {
                    "coaltype": "动力煤",
                    "demandamount": "313",
                    "quoteenddate": "2017-10-18 15:39:42",
                    "inspectionagency": "无",
                    "otherorg": "",
                    "deliverymode": "港口平仓",
                    "paymode": "现汇",
                    "transportmode": "不限",
                    "deliveryprovince": "16",
                    "deliveryplace": "佛山港",
                    "otherplace": "",
                    "deliverydatestart": "",
                    "deliverydateend": "",
                    "deliverydate": "2017-10-22",
                    "NCV": "30000000000000",
                    "NCV02": "4",
                    "TM": "3",
                    "TM02": "4",
                    "ADV": "3",
                    "ADV02": "1",
                    "RS": "3",
                    "RS02": "4",
                    "RV": "",
                    "RV02": "",
                    "IM": "",
                    "IM02": "",
                    "FC": "",
                    "FC02": "",
                    "AFT": "",
                    "HGI": "",
                    "ADS": "",
                    "ADS02": "",
                    "ASH": "",
                    "ASH02": "",
                    "GV": "",
                    "GV02": "",
                    "YV": "",
                    "YV02": "",
                    "PS": "0",
                    "releasecomment": ""
                }
            )
            .expect('Content-Type', /html/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err)
                done()
            })
    })

})

