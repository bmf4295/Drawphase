import { Router } from 'express';
import { dbPing } from '../db/client';
import { redisPing } from '../db/redis';


const router = Router();
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
});

router.get('/health/deps', async (req,res)=>{
    try{
        const [dbOK,redisOK] = await Promise.all([dbPing(), redisPing()]);
        res.json({ok: dbOK && redisOK, dbOK,redisOK})
    }catch(e){
       res.status(500).json({ ok: false, error: (e as Error).message })  
    }
})

export default router;