export function authorizations(roles) {
    return async (req, res, next) => {
        console.log(req.cookies);
        
        if (!req.user) return res.status(401).json({ message: "No autorizado" });
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({ message: "No tienes permisos" });
        }
        next();
    };
}