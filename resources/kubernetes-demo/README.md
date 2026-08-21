# Kubernetes Demo

Deploy a simple web application with a Secret, Deployment, and Service.

## Apply

```bash
kubectl apply -f simple-app.yaml
```

## Verify

```bash
kubectl -n k8s-demo get deployment,pods,svc,secrets
kubectl -n k8s-demo rollout status deployment/hello-web
```

## Access locally

```bash
kubectl -n k8s-demo port-forward service/hello-web 8080:80
```

Open http://localhost:8080

## Update secret value

```bash
kubectl -n k8s-demo create secret generic hello-config \
  --from-literal=WELCOME_MESSAGE='Hello after secret rotation' \
  -o yaml --dry-run=client | kubectl apply -f -
kubectl -n k8s-demo rollout restart deployment/hello-web
```

## Cleanup

```bash
kubectl delete namespace k8s-demo
```
