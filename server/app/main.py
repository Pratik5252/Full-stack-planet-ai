from fastapi import FastAPI
from .api.routes import router
from .db.database import metadata,database,engine

app = FastAPI()


app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI"}


@app.on_event("startup")
async def startup():
    await database.connect()
    async with engine.begin() as conn:
        await conn.run_sync(metadata.create_all)
    
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

      